'use client';
import {useState} from 'react';
export function ThemeToggle(){
  const [dark,setDark]=useState(false);
  return <button type="button" aria-pressed={dark} onClick={()=>{const next=!dark;setDark(next);document.documentElement.dataset.theme=next?'dark':'light';}}>{dark?'Light':'Dark'}</button>;
}
