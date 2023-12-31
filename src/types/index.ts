export interface SectorType {
    sector: string;
    subsectors: any[];
}

export interface UserType {
    name: string;
    sectors: string[];
    agree_to_terms: boolean;
}
