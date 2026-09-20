export interface Person {
  id: string;
  name: string;
  role: string;
  avatar: string;
  roomId: string;
  status: 'active' | 'warning' | 'idle';
  joinedAt: string;
}

export interface Room {
  id: string;
  nameKey: string; // استبدال name بـ nameKey لربط الترجمة
  style: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
}

export const ROOMS: Room[] = [
  { id: 'meeting-room', nameKey: 'rooms.meetingRoom', style: { top: '10%', left: '10%', width: '35%', height: '35%' } },
  { id: 'storage', nameKey: 'rooms.storage', style: { top: '10%', left: '50%', width: '40%', height: '30%' } },
  { id: 'main-office', nameKey: 'rooms.mainOffice', style: { top: '50%', left: '10%', width: '80%', height: '40%' } },
];

export const INITIAL_PEOPLE: Person[] = [
  { id: 'p1', name: 'أحمد علي', role: 'مهندس أنظمة', avatar: '👨‍💻', roomId: 'meeting-room', status: 'active', joinedAt: '10:15 AM' },
  { id: 'p2', name: 'سارة خالد', role: 'إدارة العمليات', avatar: '👩‍💼', roomId: 'main-office', status: 'active', joinedAt: '09:00 AM' },
  { id: 'p3', name: 'خالد عمر', role: 'فني صيانات', avatar: '👷‍♂️', roomId: 'main-office', status: 'warning', joinedAt: '10:45 AM' },
  { id: 'p4', name: 'مريم محمود', role: 'مشرفة أمن', avatar: '👩‍🔬', roomId: 'storage', status: 'idle', joinedAt: '08:30 AM' },
];