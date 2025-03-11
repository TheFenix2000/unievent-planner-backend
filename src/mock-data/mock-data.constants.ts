import { EventType, EventTypeColor } from 'src/libs';

// System Account ID - placeholder, will be replaced with actual system account ID during runtime
const SYSTEM_ACCOUNT_ID = 'system_account_id';

// Mock User Account
export interface MockUserAccount {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  groups: [];
  role: [];
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export const MOCK_USER_ACCOUNT: MockUserAccount = {
  email: 'mockuser@example.com',
  username: 'mockuser',
  firstName: 'Mock',
  lastName: 'User',
  groups: [],
  role: [],
  createdBy: SYSTEM_ACCOUNT_ID,
  updatedBy: SYSTEM_ACCOUNT_ID,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Mock Group
export interface MockGroup {
  name: string;
  courseName: string;
  description: string;
  avatarUrl: string;
  president: string;
  joinCodes: [];
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export const MOCK_GROUP: MockGroup = {
  name: 'Mock Group',
  courseName: 'Mock Course',
  description: 'This is a mock group description',
  avatarUrl: 'mockavatarurl',
  president: SYSTEM_ACCOUNT_ID,
  joinCodes: [],
  createdBy: SYSTEM_ACCOUNT_ID,
  updatedBy: SYSTEM_ACCOUNT_ID,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Mock Announcement
export interface MockAnnouncement {
  title: string;
  description: string;
  important: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export const MOCK_ANNOUNCEMENT: MockAnnouncement = {
  title: 'Mock Announcement',
  description: 'This is a mock announcement description',
  important: true,
  createdBy: SYSTEM_ACCOUNT_ID,
  updatedBy: SYSTEM_ACCOUNT_ID,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Mock Event
export interface MockEventTypeColor {
  color: EventTypeColor;
  type: EventType;
}

export interface MockEvent {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  groups: [];
  typeModel: MockEventTypeColor;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export const MOCK_EVENT_TYPE_COLOR: MockEventTypeColor = {
  color: EventTypeColor.CLASSES,
  type: EventType.CLASSES,
};

export const MOCK_EVENT: MockEvent = {
  title: 'Mock Event',
  description: 'This is a mock event description',
  startDate: new Date(),
  endDate: new Date(),
  groups: [],
  typeModel: MOCK_EVENT_TYPE_COLOR,
  createdBy: SYSTEM_ACCOUNT_ID,
  updatedBy: SYSTEM_ACCOUNT_ID,
  createdAt: new Date(),
  updatedAt: new Date(),
};

/**
 * Utility function to update the system account ID in all mock objects
 * This should be called once the system account ID is known
 * @param systemAccountId The ID of the system account
 */
export function updateMockDataWithSystemAccountId(
  systemAccountId: string,
): void {
  MOCK_USER_ACCOUNT.createdBy = systemAccountId;
  MOCK_USER_ACCOUNT.updatedBy = systemAccountId;

  MOCK_GROUP.president = systemAccountId;
  MOCK_GROUP.createdBy = systemAccountId;
  MOCK_GROUP.updatedBy = systemAccountId;

  MOCK_ANNOUNCEMENT.createdBy = systemAccountId;
  MOCK_ANNOUNCEMENT.updatedBy = systemAccountId;

  MOCK_EVENT.createdBy = systemAccountId;
  MOCK_EVENT.updatedBy = systemAccountId;
}
