import { Pet } from "@prisma/client";

export interface CreateServiceRequest {
  name: string;
  description: string;
  city: string;
  age: PetAge;
  energy: number;
  size: PetSize;
  independence: PetIndependence;
  type: PetType;
  photo: string;
  orgId: string;
  images: File[];
  adoptionRequirements: string[];
}

export interface CreateServiceResponse {
  pet: Pet;
}

export interface QueryParamsProps {
  age?: PetAge;
  energy?: number;
  independence?: PetIndependence;
  size?: PetSize;
  type?: PetType | "todos";
}

export type PetAge = "filhote" | "adolescente" | "idoso";

export type PetIndependence = "baixa" | "media" | "alta";

export type PetSize = "pequeno" | "medio" | "grande";

export type PetType = "cachorro" | "gato";
