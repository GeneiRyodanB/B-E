export interface Resource {
    title: string;
    author: string;
    year: string;
    type: string;
    description: string;
    topics: string[];
    resourceType: string;
  }
  
  export interface HistoricalEvent {
    year: string;
    eventName: string;
    figures: string[];
    details: string;
    period: string;
    country: string;
    regions: string[];
    topics: string[];
    eventType: string;
    resources: Resource[];
  }
  
  export interface Period {
    name: string;
    startYear: number;
    endYear: number;
    color: string;
    icon: string;
  }
  
  export interface EventType {
    icon: string;
    color: string;
  }
  
  export interface TimelineData {
    periods: Period[];
    events: HistoricalEvent[];
  }