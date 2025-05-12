// Shared helper to conditionally skip integration tests based on environment configuration.

const API_URL = process.env.EVOLUTION_API_URL || '';
const INSTANCE_NAME = process.env.EVOLUTION_API_INSTANCE || '';
const TEST_PHONE = process.env.TEST_PHONE || '';

// Tests require URL, instance name and phone number to run against real API.
const MISSING_CONFIG = !API_URL || !INSTANCE_NAME || !TEST_PHONE;

export const describeOrSkip = MISSING_CONFIG ? describe.skip : describe;
