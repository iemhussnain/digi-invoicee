import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency for Pakistan Rupees
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format date
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-PK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d);
}

/**
 * Validate NTN format (7 digits)
 */
export function isValidNTN(ntn: string): boolean {
  return /^\d{7}$/.test(ntn);
}

/**
 * Validate STRN format (XX-XX-XXXX-XXX-XX)
 */
export function isValidSTRN(strn: string): boolean {
  return /^\d{2}-\d{2}-\d{4}-\d{3}-\d{2}$/.test(strn);
}

/**
 * Validate CNIC format (13 digits)
 */
export function isValidCNIC(cnic: string): boolean {
  return /^\d{13}$/.test(cnic);
}
