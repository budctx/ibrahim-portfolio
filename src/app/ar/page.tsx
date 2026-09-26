import {redirect} from 'next/navigation';
// Historical Arabic homepage URL. The rebuild uses the unprefixed Arabic canonical.
export default function LegacyArabicHome() { redirect('/'); }
