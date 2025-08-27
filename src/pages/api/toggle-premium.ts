// pages/api/toggle-premium.ts
// This is a test endpoint to manually toggle premium status
// REMOVE THIS IN PRODUCTION - only for testing!
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

// Declare global type for TypeScript
declare global {
  var mockUsers: Map<string, any> | undefined;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Check if user is authenticated
    const session = await getSession({ req });
    if (!session || !session.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { userId, isPremium } = req.body;

    // Validate input
    if (!userId || typeof isPremium !== 'boolean') {
      return res.status(400).json({ 
        message: 'Invalid input. userId and isPremium (boolean) are required.' 
      });
    }

    // Security check: only allow users to update their own status
    if (userId !== session.user.id) {
      return res.status(403).json({ 
        message: 'Forbidden: Can only update your own status' 
      });
    }

    // Update premium status in your database
    const success = await updateUserPremiumStatusInDatabase(userId, isPremium);
    
    if (success) {
      console.log(`🔄 TEST: User ${userId} premium status toggled to: ${isPremium}`);
      
      return res.status(200).json({
        success: true,
        message: `Premium status updated to: ${isPremium}`,
        userId: userId,
        isPremium: isPremium,
      });
    } else {
      throw new Error('Failed to update database');
    }

  } catch (error) {
    console.error('Toggle premium error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to toggle premium status',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

// Mock database update function - REPLACE WITH YOUR REAL DATABASE CODE
async function updateUserPremiumStatusInDatabase(userId: string, isPremium: boolean): Promise<boolean> {
  try {
    // Example with Prisma (RECOMMENDED):
    /*
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    await prisma.user.update({
      where: { id: userId },
      data: { 
        isPremium: isPremium,
        premiumUpdatedAt: new Date(),
        updatedAt: new Date()
      }
    });
    
    await prisma.$disconnect();
    return true;
    */

    // Example with MongoDB:
    /*
    const { MongoClient } = require('mongodb');
    const client = new MongoClient(process.env.MONGODB_URI);
    
    await client.connect();
    const db = client.db('your-database-name');
    
    const result = await db.collection('users').updateOne(
      { _id: userId },
      { 
        $set: { 
          isPremium: isPremium,
          premiumUpdatedAt: new Date(),
          updatedAt: new Date()
        } 
      }
    );
    
    await client.close();
    return result.modifiedCount > 0;
    */

    // Example with MySQL/PostgreSQL (using a generic query):
    /*
    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });
    
    const [result] = await connection.execute(
      'UPDATE users SET isPremium = ?, updatedAt = NOW() WHERE id = ?',
      [isPremium, userId]
    );
    
    await connection.end();
    return result.affectedRows > 0;
    */

    // Mock implementation for testing (REPLACE THIS WITH REAL DATABASE CODE)
    console.log(`Mock DB Update: User ${userId} premium = ${isPremium}`);
    
    // Initialize global mock storage
    if (!global.mockUsers) {
      global.mockUsers = new Map();
    }
    
    // Get existing user data or create new
    const existingUser = global.mockUsers.get(userId) || { 
      id: userId, 
      isPremium: false,
      createdAt: new Date()
    };
    
    // Update premium status
    existingUser.isPremium = isPremium;
    existingUser.premiumUpdatedAt = new Date();
    existingUser.updatedAt = new Date();
    
    // Save back to mock storage
    global.mockUsers.set(userId, existingUser);
    
    // Log for debugging
    console.log('Mock Users Storage:', Array.from(global.mockUsers.entries()));
    
    return true;
  } catch (error) {
    console.error('Database update error:', error);
    return false;
  }
}

// Helper function to get user premium status from mock storage
export async function getMockUserPremiumStatus(userId: string): Promise<boolean> {
  try {
    if (!global.mockUsers) {
      global.mockUsers = new Map();
      return false;
    }
    
    const user = global.mockUsers.get(userId);
    return user?.isPremium || false;
  } catch (error) {
    console.error('Error getting mock user premium status:', error);
    return false;
  }
}

// Helper function to get all mock users (for debugging)
export async function getAllMockUsers(): Promise<Array<any>> {
  try {
    if (!global.mockUsers) {
      return [];
    }
    
    return Array.from(global.mockUsers.values());
  } catch (error) {
    console.error('Error getting all mock users:', error);
    return [];
  }
}

// Helper function to clear all mock data (for testing cleanup)
export async function clearMockUsers(): Promise<boolean> {
  try {
    if (global.mockUsers) {
      global.mockUsers.clear();
    }
    console.log('Mock users storage cleared');
    return true;
  } catch (error) {
    console.error('Error clearing mock users:', error);
    return false;
  }
}