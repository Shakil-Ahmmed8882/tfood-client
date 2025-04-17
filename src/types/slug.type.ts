export type TSlug = {
    id: string;
    slug: string;
    entity_type: 'restaurant';
    entity_id: string;
    created_at: Date;
  };
  


  export type TSlugAvailabilityResponse = {
    success: boolean;
    message: string;
    data: {
      exists: boolean;
    };
  };
  