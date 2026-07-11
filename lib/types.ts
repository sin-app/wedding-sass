export type Role = "user" | "admin";
export type Plan = "free" | "premium";
export type SubStatus = "active" | "pending" | "expired";
export type InvitationStatus = "draft" | "published";
export type Attendance = "hadir" | "tidak" | "ragu";

export interface Person {
  name: string;
  shortName: string;
  parents: string;
  instagram: string;
  photo: string;
}

export interface EventItem {
  name: string;
  date: string;
  time: string;
  venue: string;
  address: string;
}

export interface StoryItem {
  date: string;
  title: string;
  description: string;
}

export interface BankItem {
  bank: string;
  number: string;
  holder: string;
}

export interface InvitationData {
  couple: { groom: Person; bride: Person };
  date: string;
  events: EventItem[];
  maps: { url: string; embed: string };
  story: StoryItem[];
  gallery: string[];
  gift: { banks: BankItem[]; address: { label: string; value: string } };
  music: { src: string; title: string };
  hero: { background: string };
  greeting: string;
}

export interface Invitation {
  id: string;
  user_id: string;
  template_id: string;
  slug: string;
  title: string;
  status: InvitationStatus;
  data: InvitationData;
  views: number;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  role: Role;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: Plan;
  status: SubStatus;
  starts_at: string | null;
  expires_at: string | null;
  note: string | null;
}

export interface TemplateRow {
  id: string;
  slug: string;
  name: string;
  thumbnail: string | null;
  is_active: boolean;
  premium: boolean;
}

export interface Guest {
  id: string;
  invitation_id: string;
  name: string;
  group_name: string | null;
  token: string;
  opened: boolean;
  created_at: string;
}

export interface Rsvp {
  id: string;
  invitation_id: string;
  guest_id: string | null;
  name: string;
  attendance: Attendance;
  guest_count: number;
  message: string | null;
  created_at: string;
}

export interface Wish {
  id: string;
  invitation_id: string;
  name: string;
  message: string;
  created_at: string;
}
