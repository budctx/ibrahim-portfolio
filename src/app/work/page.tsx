import {permanentRedirect} from 'next/navigation';

// Keep existing bookmarks on the same approved Work collection.
export default function WorkPage() {
  permanentRedirect('/en#work');
}
