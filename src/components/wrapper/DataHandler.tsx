import { Component, ReactNode } from 'react';
import { SearchIcon } from '@/assets/icons/Icons';
import { Skeleton } from '@/components/ui/skeleton';

// Generic type for data
type DataHandlerProps<T> = {
  data: T | undefined | null;       
  isLoading: boolean;               
  isError: boolean;                 
  children: (data: T) => ReactNode; 
  loadingFallback?: ReactNode;      
  errorFallback?: ReactNode;        
  noDataFallback?: ReactNode;       
  loadingMessage?: string;          
  errorMessage?: string;            
  noDataMessage?: string;           
  hasData?: (data: T | null | undefined) => data is T;   // Custom logic to check if data exists
  onRetry?: () => void;             // Optional retry callback
  onError?: (error: Error, info: { componentStack: string }) => void; // Callback for runtime errors
};

interface State {
  hasRuntimeError: boolean;
  runtimeError: Error | null;
}

/**
 * DataHandler Component:
 * - Handles loading, error (explicit and runtime), and no-data states for fetched data.
 * - Acts as a true error boundary using componentDidCatch.
 * - Reduces boilerplate by combining suspense, error boundary, and no-data checks.
 *
 * @template T - The type of the data being handled.
 *
 * @example
 * // Basic Usage: Fetching and displaying a list of items
 * import { DataHandler } from './DataHandler';
 *
 * type Item = { id: string; name: string };
 *
 * const ItemList = () => {
 *   const { data, isLoading, isError } = useQuery('items', fetchItems);
 *   return (
 *     <DataHandler<Item[]>
 *       data={data}
 *       isLoading={isLoading}
 *       isError={isError}
 *       noDataMessage="No items available"
 *     >
 *       {(items) => (
 *         <ul>
 *           {items.map((item) => (
 *             <li key={item.id}>{item.name}</li>
 *           ))}
 *         </ul>
 *       )}
 *     </DataHandler>
 *   );
 * };
 *
 * @example
 * // Custom Fallbacks: Using custom UI for loading, error, and no-data states
 * const CustomLoading = () => <div>Custom Loading Spinner...</div>;
 * const CustomError = ({ retry }) => (
 *   <div>
 *     <p>Error occurred!</p>
 *     <button onClick={retry}>Retry</button>
 *   </div>
 * );
 * const CustomNoData = () => <div>No data found, try searching again.</div>;
 *
 * const ItemListWithCustomFallbacks = () => {
 *   const { data, isLoading, isError } = useQuery('items', fetchItems);
 *   return (
 *     <DataHandler<Item[]>
 *       data={data}
 *       isLoading={isLoading}
 *       isError={isError}
 *       loadingFallback={<CustomLoading />}
 *       errorFallback={<CustomError retry={() => console.log('Retrying...')} />}
 *       noDataFallback={<CustomNoData />}
 *     >
 *       {(items) => (
 *         <ul>
 *           {items.map((item) => (
 *             <li key={item.id}>{item.name}</li>
 *           ))}
 *         </ul>
 *       )}
 *     </DataHandler>
 *   );
 * };
 *
 * @example
 * // Custom hasData Logic: Handling a specific data structure
 * type User = { id: string; name: string; isActive: boolean };
 *
 * const ActiveUserList = () => {
 *   const { data, isLoading, isError } = useQuery('users', fetchUsers);
 *   return (
 *     <DataHandler<User[]>
 *       data={data}
 *       isLoading={isLoading}
 *       isError={isError}
 *       hasData={(users): users is User[] => !!users && users.some(user => user.isActive)}
 *       noDataMessage="No active users found"
 *     >
 *       {(users) => (
 *         <ul>
 *           {users.filter(user => user.isActive).map((user) => (
 *             <li key={user.id}>{user.name}</li>
 *           ))}
 *         </ul>
 *       )}
 *     </DataHandler>
 *   );
 * };
 *
 * @example
 * // Handling Runtime Errors: Logging runtime errors
 * const ItemListWithErrorLogging = () => {
 *   const { data, isLoading, isError } = useQuery('items', fetchItems);
 *   return (
 *     <DataHandler<Item[]>
 *       data={data}
 *       isLoading={isLoading}
 *       isError={isError}
 *       onError={(error, info) => console.error('Runtime Error:', error, info)}
 *     >
 *       {(items) => {
 *         // Simulate a runtime error
 *         if (Math.random() > 0.5) throw new Error('Random crash!');
 *         return (
 *           <ul>
 *             {items.map((item) => (
 *               <li key={item.id}>{item.name}</li>
 *             ))}
 *           </ul>
 *         );
 *       }}
 *     </DataHandler>
 *   );
 * };
 */
export class DataHandler<T> extends Component<DataHandlerProps<T>, State> {
  state: State = {
    hasRuntimeError: false,
    runtimeError: null,
  };

  static getDerivedStateFromError(error: Error) {
    // Update state when a runtime error occurs
    return { hasRuntimeError: true, runtimeError: error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    // Log or handle the runtime error
    this.props.onError?.(error, info);
  }

  resetError = () => {
    // Reset runtime error state
    this.setState({ hasRuntimeError: false, runtimeError: null });
  };

  render() {
    const {
      data,
      isLoading,
      isError,
      children,
      loadingFallback,
      errorFallback,
      noDataFallback,
      loadingMessage = 'Loading...',
      errorMessage = 'An unexpected error occurred',
      noDataMessage = 'No items found',
      hasData = (d: T | null | undefined): d is T => (Array.isArray(d) ? d.length > 0 : !!d),
      onRetry,
    } = this.props;

    const { hasRuntimeError, runtimeError } = this.state;

    // Runtime error takes precedence
    if (hasRuntimeError) {
      return errorFallback ?? (
        <ErrorFallback
          message={runtimeError?.message || errorMessage}
          onRetry={this.resetError}
        />
      );
    }

    // Explicit error from isError prop
    if (isError) {
      return errorFallback ?? (
        <ErrorFallback message={errorMessage} onRetry={onRetry} />
      );
    }

    // Loading state
    if (isLoading) {
      return loadingFallback ?? (
        <LoadingFallback message={loadingMessage} />
      );
    }

    // No data state
    if (!hasData(data)) {
      return noDataFallback ?? (
        <NoDataFallback message={noDataMessage} onRetry={onRetry} />
      );
    }

    // Data available, render children
    return <>{children(data)}</>;
  }
}

// Default Fallback Components
export const LoadingFallback = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center space-y-4 h-[30vh]">
    <Skeleton className="h-4 w-full max-w-md" />
    <Skeleton className="h-4 w-[90%] max-w-md" />
    <Skeleton className="h-4 w-full max-w-md" />
    <p className="text-gray-500 text-sm">{message}</p>
  </div>
);

const ErrorFallback = ({ message, onRetry }: { message: string; onRetry?: () => void }) => (
  <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r">
    <div className="flex items-start">
      <svg
        className="w-8 h-8 text-red-500 mt-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <div className="ml-4">
        <h3 className="text-xl font-medium text-red-800">Oops! Something went wrong</h3>
        <p className="text-sm text-red-700 mt-1">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 text-sm text-red-600 hover:text-red-800 font-medium"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  </div>
);

const NoDataFallback = ({ message, onRetry }: { message: string; onRetry?: () => void }) => (
  <>
  
  
  <div className="flex flex-col items-center justify-center p-8 rounded-lg border border-gray-200 bg-white">
    <div className="w-16 h-16 rounded-full bg-[hsl(44,100%,95%)] flex items-center justify-center mb-4">
      <SearchIcon className="w-8 h-8 text-[#fdc000]" />
    </div>
    <h3 className="text-lg font-medium text-gray-800 mb-2">{message}</h3>
    <p className="text-gray-500 text-center max-w-md">
      We couldn't find any items matching your criteria. Try adjusting your filters.
    </p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="mt-4 px-4 py-2 bg-[#fdc000] text-white rounded hover:bg-opacity-90"
      >
        Retry
      </button>
    )}
  </div>
  </>
);