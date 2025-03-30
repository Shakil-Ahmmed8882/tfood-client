import { Component, ReactNode } from 'react';

type Props = {
	children: ReactNode;
	fallback?: ReactNode;
};

type State = {
	hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(): void {
        // __________
        // __________
	}

	render() {
		if (this.state.hasError) {
			return (
				this.props.fallback ?? (
					<div className='text-red-500'>Something went wrong</div>
				)
			);
		}
        
		return this.props.children;
	}

}
