import { Next } from "../../../infrastructureLayer/types/serverPackageTypes";
// import { IJsonResponse } from "./IjsonResponse";

export interface IcloudStorage {
    generateUploadURL(next: Next): Promise<any>
}