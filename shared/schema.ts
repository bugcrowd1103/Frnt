import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow()
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true
});

// Preference types for the travel planning
export const preferenceTypes = {
  destinationType: [
    "beach",
    "city",
    "mountains",
    "culture",
    "adventure",
    "wildlife",
    "countryside",
    "island",
    "historic"
  ],
  duration: [
    "weekend",
    "short",
    "standard",
    "long"
  ],
  budget: [
    "budget",
    "midrange",
    "luxury"
  ],
  pace: [
    "relaxed",
    "moderate",
    "active"
  ],
  travelCompanions: [
    "solo",
    "couple",
    "family",
    "friends",
    "group"
  ]
} as const;

// Travel Preferences table
export const travelPreferences = pgTable("travel_preferences", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  destinationType: text("destination_type"),
  customDestination: text("custom_destination"),
  duration: text("duration"),
  startDate: text("start_date"),
  endDate: text("end_date"),
  budget: text("budget"),
  interests: text("interests"),
  pace: text("pace"),
  companions: text("companions"),
  activities: text("activities"),
  mealPreferences: text("meal_preferences"),
  dietaryRestrictions: text("dietary_restrictions"),
  accommodation: text("accommodation"),
  transportationMode: text("transportation_mode"),
  additionalNotes: text("additional_notes"),
  createdAt: timestamp("created_at").defaultNow()
});

export const insertTravelPreferenceSchema = createInsertSchema(travelPreferences).omit({
  id: true,
  createdAt: true
});

// Itinerary table
export const itineraries = pgTable("itineraries", {
  id: serial("id").primaryKey(),
  preferenceId: integer("preference_id").references(() => travelPreferences.id),
  userId: integer("user_id").references(() => users.id),
  title: text("title").notNull(),
  destination: text("destination").notNull(),
  duration: text("duration").notNull(),
  summary: text("summary"),
  content: jsonb("content").notNull(), // Stores the full itinerary JSON
  createdAt: timestamp("created_at").defaultNow()
});

export const insertItinerarySchema = createInsertSchema(itineraries).omit({
  id: true,
  createdAt: true
});

// Conversations table for storing chat messages
export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  preferenceId: integer("preference_id").references(() => travelPreferences.id),
  messages: jsonb("messages").notNull().default([]), // Array of messages
  createdAt: timestamp("created_at").defaultNow()
});

export const insertConversationSchema = createInsertSchema(conversations).omit({
  id: true,
  createdAt: true
});

// Define message type for chat
export const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  timestamp: z.number()
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type TravelPreference = typeof travelPreferences.$inferSelect;
export type InsertTravelPreference = z.infer<typeof insertTravelPreferenceSchema>;

export type Itinerary = typeof itineraries.$inferSelect;
export type InsertItinerary = z.infer<typeof insertItinerarySchema>;

export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = z.infer<typeof insertConversationSchema>;

export type Message = z.infer<typeof messageSchema>;
