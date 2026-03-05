export interface Database {
  public: {
    Tables: {
      servers: {
        Row: {
          id: string;
          name: string;
          map: string;
          cluster: "pvp" | "pve";
          host: string;
          port: number;
          max_players: number;
          status: "online" | "offline" | "restarting";
          player_count: number;
          uptime: string;
          last_updated: string;
        };
        Insert: Omit<Database["public"]["Tables"]["servers"]["Row"], "last_updated">;
        Update: Partial<Database["public"]["Tables"]["servers"]["Row"]>;
      };
      announcements: {
        Row: {
          id: string;
          title: string;
          content: string;
          type: "update" | "maintenance" | "event" | "general";
          created_at: string;
          published: boolean;
        };
        Insert: Omit<Database["public"]["Tables"]["announcements"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["announcements"]["Row"]>;
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}
