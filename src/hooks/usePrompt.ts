import { useContext, useEffect } from 'react';
import type { Navigator } from 'react-router-dom';

import {
  UNSAFE_NavigationContext as NavigationContext,
} from 'react-router-dom';

export function usePrompt(when: boolean, message: string) {
  const navigator = useContext(NavigationContext).navigator as Navigator;

  useEffect(() => {
    if (!when) return;

    const push = navigator.push;
    const replace = navigator.replace;
    
    const confirm = (method: typeof push) => {
      return (...args: Parameters<typeof push>) => {
        const confirmLeave = window.confirm(message);
        if (confirmLeave) {
          method(...args);
        }
      };
    };

    navigator.push = confirm(push);
    navigator.replace = confirm(replace);

    return () => {
      navigator.push = push;
      navigator.replace = replace;
    };
  }, [navigator, when, message]);
}
