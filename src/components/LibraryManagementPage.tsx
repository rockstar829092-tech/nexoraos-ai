import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from './PageLayout';
import { 
  BookOpen, 
  Search, 
  Plus, 
  X, 
  User, 
  Hash, 
  AlertTriangle, 
  CheckCircle, 
  Download, 
  RefreshCw, 
  Bell, 
  ArrowLeft, 
  Clock, 
  Trash2, 
  Filter, 
  Calendar,
  Sparkles,
  BookMarked,
  Activity,
  Barcode,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  coverBg: string;
}

const INITIAL_BOOKS: Book[] = [
  { id: "B-8801", title: "Introduction to Quantum Physics", author: "Dr. Richard S. Feynman", isbn: "978-0131103627", category: "Science & Physics", totalCopies: 16, availableCopies: 12, coverBg: "from-blue-600 to-indigo-700" },
  { id: "B-8802", title: "Macroeconomics Policy", author: "Prof. Olivia Taylor", isbn: "978-0324224726", category: "Economics", totalCopies: 15, availableCopies: 15, coverBg: "from-emerald-600 to-teal-700" },
  { id: "B-8803", title: "Computer Programming", author: "Donald E. Knuth", isbn: "978-0201896831", category: "Computer Science", totalCopies: 4, availableCopies: 3, coverBg: "from-slate-700 to-slate-900" },
];

export const LibraryManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <PageLayout theme="light" setTheme={() => {}}>
      <div className="min-h-screen bg-white dark:bg-black font-sans pb-24 text-slate-800 dark:text-[#F5F5F7] transition-colors">
        <section className="relative overflow-hidden py-14 bg-slate-50 dark:bg-zinc-950 border-b border-slate-200 dark:border-white/10">
          <div className="mx-auto max-w-7xl px-6 relative z-10">
            <div className="max-w-3xl space-y-4">
              <span className="text-[11px] font-black text-blue-700 bg-blue-100 dark:bg-blue-500/20 dark:text-blue-400 py-1 px-3 rounded-md uppercase tracking-wider inline-flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Library Systems
              </span>
              <h1 className="text-3xl sm:text-4.5xl font-black text-slate-900 dark:text-white uppercase">Library Management</h1>
              <p className="text-slate-600 dark:text-slate-400 font-semibold text-sm">Supervise institutional knowledge assets and archival records.</p>
            </div>
          </div>
        </section>

        <main className="mx-auto max-w-7xl px-6 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input 
                    type="text"
                    placeholder="Search books..."
                    className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {books.map(book => (
                  <div key={book.id} className="p-4 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm">
                    <div className={`h-32 w-full bg-gradient-to-tr ${book.coverBg} rounded-xl mb-4`} />
                    <h4 className="text-sm font-black dark:text-white">{book.title}</h4>
                    <p className="text-xs text-slate-500">{book.author}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </PageLayout>
  );
};
