
import { Session, SessionFormData } from "@/types/session";
import { SessionService } from "@/services/SessionService";
import { SpecialistService } from "@/services/SpecialistService";
import { ClientService } from "@/services/ClientService";

export class SessionController {
  // Session CRUD operations
  static async getSessions(): Promise<Session[]> {
    return SessionService.getSessions();
  }

  static async getSessionById(id: string): Promise<Session | null> {
    return SessionService.getSessionById(id);
  }

  static async createSession(sessionData: SessionFormData): Promise<Session | null> {
    return SessionService.createSession(sessionData);
  }

  static async updateSession(id: string, sessionData: Partial<SessionFormData>): Promise<Session | null> {
    return SessionService.updateSession(id, sessionData);
  }

  static async deleteSession(id: string): Promise<boolean> {
    return SessionService.deleteSession(id);
  }

  static async listSessions(): Promise<Session[]> {
    return SessionService.listSessions();
  }

  static async sendSessionInvite(sessionId: string): Promise<boolean> {
    return SessionService.sendSessionInvite(sessionId);
  }

  static async getSessionsByClient(clientId: string): Promise<Session[]> {
    return SessionService.getSessionsByClient(clientId);
  }

  // Specialist operations
  static async getSpecialistDetails(id: string) {
    return SpecialistService.getSpecialistDetails(id);
  }

  static async getAllSpecialists() {
    return SpecialistService.getAllSpecialists();
  }

  static async getSpecialistSessionCount(specialistId: string): Promise<number> {
    return SpecialistService.getSpecialistSessionCount(specialistId);
  }

  // Client operations
  static async getAllClients() {
    return ClientService.getAllClients();
  }

  static async getClientSessionCount(clientId: string): Promise<number> {
    return ClientService.getClientSessionCount(clientId);
  }
}
