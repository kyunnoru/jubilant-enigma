// src/hooks/useRouteGuard.ts (Versi Aman - Anti Infinite Loop)

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useNeurviaStore } from '@/store/neurviaStore';

export const useRouteGuard = (currentStep: number) => {
  const router = useRouter();
  const hasRedirected = useRef(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip on initial mount to prevent immediate redirects
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Prevent multiple redirects
    if (hasRedirected.current) {
      return;
    }

    // Get state values safely
    const state = useNeurviaStore.getState();
    
    let shouldRedirect = false;
    let targetPath = '';

    // Check prerequisites
    if (currentStep === 2) {
      const hasPsychometricData = Object.keys(state.psychometric.riasec).length > 0;
      if (!hasPsychometricData) {
        shouldRedirect = true;
        targetPath = '/neurvia/step-1';
      }
    }

    if (currentStep === 3) {
      const hasAcademicData = !!state.academic.ekstrakurikuler_utama_id;
      if (!hasAcademicData) {
        shouldRedirect = true;
        targetPath = '/neurvia/step-2';
      }
    }

    // Perform redirect if needed
    if (shouldRedirect && targetPath) {
      hasRedirected.current = true;
      
      // Use setTimeout to avoid immediate redirect during render
      setTimeout(() => {
        router.replace(targetPath);
      }, 100);
    }

  }, [currentStep, router]);
};