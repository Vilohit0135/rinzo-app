import { useEffect } from 'react';
import { initializeNotifications, startPushSimulation, stopPushSimulation } from '../services/notification.service';

export function useNotifications(enablePushSimulation: boolean = false) {
  useEffect(() => {
    initializeNotifications();
    if (enablePushSimulation) {
      startPushSimulation(120000);
    }
    return () => {
      if (enablePushSimulation) {
        stopPushSimulation();
      }
    };
  }, [enablePushSimulation]);
}
