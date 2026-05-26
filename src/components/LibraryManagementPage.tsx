import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  coverBg: string; // Gradient mockup
}

interface IssueRecord {
  id: string;
  bookId: string;
  bookTitle: string;
  issuedTo: string;
  issuedToRole: 'Student' | 'Staff';
  issueDate: string;
  dueDate: string;
  status: 'active' | 'returned' | 'overdue';
  fineAmount: number;
}

const INITIAL_BOOKS: Book[] = [
  {
    id: "B-8801",
    title: "Introduction to Quantum Physics",
    author: "Dr. Richard S. Feynman",
    isbn: "978-0131103627",
    category: "Science & Physics",
    totalCopies: 16,
    availableCopies: 12,
    coverBg: "from-blue-600 to-indigo-700"
  },
  {
    id: "B-8802",
    title: "Macroeconomics & Monetary Policy",
    author: "Prof. Olivia Taylor",
    isbn: "978-0324224726",
    category: "Economics",
    totalCopies: 15,
    availableCopies: 15,
    coverBg: "from-emerald-600 to-teal-700"
  },
  {
    id: "B-8803",
    title: "The Art of Computer Programming",
    author: "Donald E. Knuth",
    isbn: "978-0201896831",
    category: "Computer Science",
    totalCopies: 4,
    availableCopies: 3,
    coverBg: "from-slate-700 to-slate-900"
  },
  {
    id: "B-8804",
    title: "Chronicles of Shakespeare's Drama",
    author: "William Shakespeare",
    isbn: "978-0743477123",
    category: "Literature",
    totalCopies: 9,
    availableCopies: 6,
    coverBg: "from-amber-600 to-orange-700"
  },
  {
    id: "B-8805",
    title: "Advanced Organic Chemistry",
    author: "Dr. Alan G. MacDiarmid",
    isbn: "978-0198503309",
    category: "Science & Chemistry",
    totalCopies: 10,
    availableCopies: 8,
    coverBg: "from-rose-600 to-pink-700"
  }
];

const INITIAL_RECORDS: IssueRecord[] = [
  {
    id: "R-501",
    bookId: "B-8801",
    bookTitle: "Introduction to Quantum Physics",
    issuedTo: "Aarav Sharma (Grade XII-A)",
    issuedToRole: "Student",
    issueDate: "2026-05-10",
    dueDate: "2026-05-20", // Overdue calculated based on default May 25 local time
    status: "overdue",
    fineAmount: 25,
  },
  {
    id: "R-502",
    bookId: "B-8803",
    bookTitle: "The Art of Computer Programming",
    issuedTo: "Arjun Mehta (Grade XI-B)",
    issuedToRole: "Student",
    issueDate: "2026-05-18",
    dueDate: "2026-05-28",
    status: "active",
    fineAmount: 0,
  },
  {
    id: "R-503",
    bookId: "B-8805",
    bookTitle: "Advanced Organic Chemistry",
    issuedTo: "Dr. Sunita Rao (Chemistry HOD)",
    issuedToRole: "Staff",
    issueDate: "2026-05-08",
    dueDate: "2026-05-22",
    status: "overdue",
    fineAmount: 15,
  },
  {
    id: "R-504",
    bookId: "B-8805",
    bookTitle: "Advanced Organic Chemistry",
    issuedTo: "Sarah Collins (Grade X-C)",
    issuedToRole: "Student",
    issueDate: "2026-05-01",
    dueDate: "2026-05-11",
    status: "returned",
    fineAmount: 0,
  }
];

const INITIAL_FEED = [
  { id: 1, text: "Aarav Sharma returned 'Introduction to Physics'", time: "4 mins ago", type: "return" },
  { id: 2, text: "Dr. Sunita Rao requested loan extension on 'Organic Chemistry'", time: "1 hour ago", type: "alert" },
  { id: 3, text: "Sarah Collins checked out 'Differential Calculus III'", time: "2 hours ago", type: "issue" },
  { id: 4, text: "Autonomous system dispatched Email Reminder to John Doe", time: "5 hours ago", type: "remind" }
];

interface LibraryManagementPageProps {
  onBack: () => void;
}

function safeParse(value: string | null, fallback: any = {}) {
  try {
    if (value === undefined || value === null || value === "" || value === "undefined") {
      return fallback;
    }
    return JSON.parse(value);
  } catch (error) {
    console.error("JSON Parse Error:", error);
    return fallback;
  }
}

export const LibraryManagementPage: React.FC<LibraryManagementPageProps> = ({ onBack }) => {
  // Books state
  const [books, setBooks] = useState<Book[]>(() => {
    const cached = localStorage.getItem('nexora_library_books');
    const parsed = safeParse(cached, INITIAL_BOOKS);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_BOOKS;
  });

  // Records state
  const [records, setRecords] = useState<IssueRecord[]>(() => {
    const cached = localStorage.getItem('nexora_library_records');
    const parsed = safeParse(cached, INITIAL_RECORDS);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_RECORDS;
  });

  // Recent feed state
  const [feed, setFeed] = useState(INITIAL_FEED);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Barcode Simulator States
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<Book | null>(null);

  // Registration modal form state
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newIsbn, setNewIsbn] = useState("");
  const [newCategory, setNewCategory] = useState("Science & Physics");
  const [newCopies, setNewCopies] = useState<number>(10);

  // Checkout quick action state
  const [quickIssueBookId, setQuickIssueBookId] = useState("");
  const [quickRecipient, setQuickRecipient] = useState("");
  const [quickRole, setQuickRole] = useState<'Student' | 'Staff'>('Student');

  // Interactive alert notifications list
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'alert' } | null>(null);

  useEffect(() => {
    localStorage.setItem('nexora_library_books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('nexora_library_records', JSON.stringify(records));
  }, [records]);

  const showToast = (message: string, type: 'success' | 'alert' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleRegisterBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim() || !newIsbn.trim()) {
      showToast("Please fill in all the required metadata parameters.", "alert");
      return;
    }

    const gradients = [
      "from-blue-600 to-indigo-700",
      "from-emerald-600 to-teal-700",
      "from-slate-700 to-slate-900",
      "from-amber-600 to-orange-700",
      "from-rose-600 to-pink-700",
      "from-purple-600 to-violet-700"
    ];
    const chosenBg = gradients[Math.floor(Math.random() * gradients.length)];

    const newBook: Book = {
      id: `B-${Math.floor(8800 + Math.random() * 1000)}`,
      title: newTitle.trim(),
      author: newAuthor.trim(),
      isbn: newIsbn.trim(),
      category: newCategory,
      totalCopies: newCopies,
      availableCopies: newCopies,
      coverBg: chosenBg
    };

    setBooks([newBook, ...books]);
    setIsRegisterOpen(false);
    
    // Add to activity logs
    setFeed([{
      id: Date.now(),
      text: `System cataloged new reference title '${newBook.title}'`,
      time: "Just now",
      type: "issue"
    }, ...feed]);

    // Clear form
    setNewTitle("");
    setNewAuthor("");
    setNewIsbn("");
    setNewCopies(10);
    showToast(`"${newBook.title}" successfully enrolled!`);
  };

  const handleQuickIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickIssueBookId || !quickRecipient.trim()) {
      showToast("Select a book title and insert recipient full credentials.", "alert");
      return;
    }

    const targetBook = books.find(b => b.id === quickIssueBookId);
    if (!targetBook) return;

    if (targetBook.availableCopies <= 0) {
      showToast(`No physical copies of "${targetBook.title}" left in stock!`, "alert");
      return;
    }

    // Process issue
    const newRecord: IssueRecord = {
      id: `R-${Math.floor(510 + Math.random() * 400)}`,
      bookId: targetBook.id,
      bookTitle: targetBook.title,
      issuedTo: quickRecipient.trim(),
      issuedToRole: quickRole,
      issueDate: "2026-05-25",
      dueDate: "2026-06-04", // 10 days default standard check
      status: 'active',
      fineAmount: 0
    };

    setBooks(prevBooks => prevBooks.map(b => 
      b.id === targetBook.id ? { ...b, availableCopies: b.availableCopies - 1 } : b
    ));

    setRecords([newRecord, ...records]);
    setFeed([{
      id: Date.now(),
      text: `${quickRecipient} checked out '${targetBook.title}'`,
      time: "Just now",
      type: "issue"
    }, ...feed]);

    // Reset Quick Access
    setQuickRecipient("");
    setQuickIssueBookId("");
    showToast("Digital transaction registered into operating system ledger!");
  };

  const handleReturnItem = (recordId: string) => {
    const record = records.find(r => r.id === recordId);
    if (!record || record.status === 'returned') return;

    setRecords(prev => prev.map(rec => 
      rec.id === recordId ? { ...rec, status: 'returned' } : rec
    ));

    setBooks(prev => prev.map(bk => 
      bk.id === record.bookId ? { ...bk, availableCopies: Math.min(bk.totalCopies, bk.availableCopies + 1) } : bk
    ));

    setFeed([{
      id: Date.now(),
      text: `${record.issuedTo} returned '${record.bookTitle}' and cleared logs`,
      time: "Just now",
      type: "return"
    }, ...feed]);

    if (record.fineAmount > 0) {
      showToast(`Resource log updated. Retained ₹${record.fineAmount} overdue penalty.`);
    } else {
      showToast("Checkout checked back in. Inventory refreshed.");
    }
  };

  const triggerAuditNotification = (recipient: string, bookName: string) => {
    showToast(`Autonomous alert dispatch success to: ${recipient}`);
    setFeed([{
      id: Date.now(),
      text: `Dispatched overdue reminder trigger SMS to ${recipient}`,
      time: "Just now",
      type: "remind"
    }, ...feed]);
  };

  const handleSimulateScan = () => {
    if (scanning) return;
    setScanning(true);
    setScanResult(null);

    setTimeout(() => {
      // Pick random book to checkout/scan
      const randomBook = books[Math.floor(Math.random() * books.length)];
      setScanResult(randomBook);
      setScanning(false);
      showToast(`Scan verified! Decoded catalog ISBN: ${randomBook.isbn}`);
    }, 1500);
  };

  const handleDeleteBook = (id: string, title: string) => {
    // Check if copies are issued
    const activeIssue = records.find(r => r.bookId === id && r.status !== 'returned');
    if (activeIssue) {
      showToast("Cannot delete. Copies of this book are currently issued out.", "alert");
      return;
    }

    setBooks(books.filter(b => b.id !== id));
    showToast(`Deleted ${title} from general archives.`);
  };

  // Capacity calculations
  const totalStock = books.reduce((sum, b) => sum + b.totalCopies, 0);
  const totalIssuedCount = books.reduce((sum, b) => sum + (b.totalCopies - b.availableCopies), 0);
  const dynamicCapacityRate = totalStock > 0 ? (totalIssuedCount / totalStock) * 100 : 0;

  // Filter books matching query
  const filteredBooks = books.filter(b => {
    const matcher = b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    b.author.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    b.isbn.includes(searchTerm) || 
                    b.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || b.category === selectedCategory;
    return matcher && matchesCategory;
  });

  const uniqueCategories = ["All Categories", "Science & Physics", "Science & Chemistry", "Economics", "Computer Science", "Literature"];

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] select-text text-slate-800 font-sans flex flex-col relative overflow-hidden pb-12">
      {/* Visual Ambiance Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Main SaaS Module Header */}
      <div className="border-b border-slate-200/80 bg-white/95 backdrop-blur shadow-3xs sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={onBack}
              className="group flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 rounded-lg text-xs font-bold transition-all shadow-3xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>← Back to Main Dashboard</span>
            </button>
            <div className="h-4 w-px bg-slate-200 hidden sm:block" />
            <span className="px-2 py-0.5 bg-blue-50 border border-blue-100 text-[#2563EB] text-[9px] font-black uppercase tracking-widest rounded-md">
              MODULE 03
            </span>
            <div className="w-full md:w-auto">
              <h1 className="text-sm font-black text-[#0F172A] uppercase tracking-tight leading-none font-sans">
                Automated Library Management Ecosystem
              </h1>
              <p className="text-[10px] text-slate-400 font-semibold mt-1">Autonomous Inventory Ledger & Distribution Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRegisterOpen(true)}
              className="py-1.5 px-3 bg-[#2563EB] hover:bg-blue-700 active:scale-[0.98] text-white rounded-lg text-[10px] font-black flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all uppercase tracking-wider"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Register Archive Asset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Toast Alert Notification Layer */}
      <AnimatePresence>
        {toast && (
          <div className="fixed top-20 right-4 z-50">
            <motion.div 
              initial={{ opacity: 0, x: 20, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 20, y: -10 }}
              className={`p-3 rounded-xl text-white text-xs font-bold shadow-lg flex items-center gap-2 border ${toast.type === 'success' ? 'bg-emerald-600 border-emerald-500' : 'bg-rose-600 border-rose-500'}`}
            >
              {toast.type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <ShieldAlert className="w-4 h-4 shrink-0" />}
              <span>{toast.message}</span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        
        {/* Responsive Grid Matrix Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ==================== LEFT COLUMN: 5 CORE FEATURES ==================== */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* FEATURE 5: CLOUD ANALYTICS DATABASE OVERVIEW - DIGITAL RECORDS */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-3xs">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <BookMarked className="w-4.5 h-4.5 text-[#2563EB]" />
                  <span className="text-xs font-black uppercase text-slate-800 tracking-wider">Cloud Analytics Database View</span>
                </div>
                <span className="text-[9px] font-mono text-slate-400">Live Operating System Logs</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl text-center">
                  <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block mb-1">Total Volumes</span>
                  <span className="text-xl font-black text-slate-900 leading-none">{totalStock} Books</span>
                  <div className="text-[9px] text-emerald-600 font-extrabold flex items-center justify-center gap-0.5 mt-1.5">
                    <span>99.8% Perfect Sync</span>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl text-center">
                  <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block mb-1">Unique Titles</span>
                  <span className="text-xl font-black text-slate-900 leading-none">{books.length} Cataloged</span>
                  <div className="text-[9px] text-[#2563EB] font-extrabold flex items-center justify-center gap-0.5 mt-1.5">
                    <span>Active Digital Indices</span>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl text-center">
                  <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block mb-1">Active Readers</span>
                  <span className="text-xl font-black text-slate-900 leading-none">{records.filter(r => r.status !== 'returned').length} Assigned</span>
                  <div className="text-[9px] text-amber-600 font-extrabold flex items-center justify-center gap-0.5 mt-1.5">
                    <span>Students & Faculty</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FEATURE 1: BOOK INVENTORY - DIGITAL CATALOG INTERFACE */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-3xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-50 text-[#2563EB] rounded-lg">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-[#0F172A] uppercase tracking-wider">Book Inventory & Catalog</h3>
                    <p className="text-[9px] text-slate-400 font-semibold">Track volumes, copies, physical placement, and real-time checkout availability</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input 
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search title, ISBN..."
                      className="bg-slate-50 border border-slate-200 text-slate-800 text-[10px] pl-8 pr-3 py-1.5 rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 w-36 sm:w-48 font-semibold"
                    />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-600 text-[10px] py-1.5 px-2 rounded-lg focus:outline-none font-semibold"
                  >
                    {uniqueCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* BOOK COVER GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredBooks.length === 0 ? (
                  <div className="sm:col-span-2 p-8 text-center text-slate-400 border border-dashed border-slate-200 rounded-xl">
                    <AlertTriangle className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <p className="text-xs font-bold text-slate-500">No titles match current filter criteria</p>
                  </div>
                ) : (
                  filteredBooks.map(book => {
                    const borrowed = book.totalCopies - book.availableCopies;
                    
                    return (
                      <div 
                        key={book.id} 
                        className="p-3 bg-slate-50 hover:bg-white rounded-xl border border-slate-200/70 hover:border-blue-300 transition-all flex gap-3 shadow-[0_1px_2px_rgba(0,0,0,0.02)] group hover:shadow-2xs"
                      >
                        {/* CSS designed physical cover block */}
                        <div className={`w-14 h-20 shrink-0 bg-gradient-to-br ${book.coverBg} rounded shadow-sm text-white p-1.5 flex flex-col justify-between relative overflow-hidden text-center select-none`}>
                          <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-white/10" />
                          <span className="text-[6px] font-mono tracking-widest text-white/75 truncate uppercase block">{book.category}</span>
                          <span className="text-[7.5px] font-black leading-tight line-clamp-3 uppercase tracking-tight">{book.title}</span>
                          <span className="text-[6px] font-bold text-white/90 truncate block">{book.author}</span>
                        </div>

                        {/* Inventory info */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h4 className="text-[11.5px] font-black text-slate-900 truncate uppercase mt-0.5 leading-tight">{book.title}</h4>
                            <p className="text-[9px] text-slate-400 font-bold">ISBN: {book.isbn}</p>
                          </div>

                          <div className="flex items-center justify-between border-t border-slate-100 pt-1.5 mt-1">
                            <div className="text-[9px] font-bold">
                              <span className="text-emerald-600 font-extrabold mr-1.5">Available: {book.availableCopies}</span>
                              <span className="text-slate-400">Issued: {borrowed}</span>
                            </div>
                            <button
                              onClick={() => handleDeleteBook(book.id, book.title)}
                              className="text-rose-500 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 p-1 rounded transition-all cursor-pointer shadow-3xs"
                              title="Delist from records"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* FEATURE 2: ISSUE/RETURN TRACKING TRANSACTIONS TABLE */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-3xs overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-blue-600" />
                    <span>Digital Issue & Return Tracking Ledger</span>
                  </h3>
                  <p className="text-[9.5px] text-slate-400 font-semibold mt-0.5">Physical check-outs mapped securely to educational profiles</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[8px] font-extrabold tracking-wider text-slate-400 uppercase">
                      <th className="py-2 px-4">Register ID</th>
                      <th className="py-2 px-4">Checked Reference</th>
                      <th className="py-2 px-4">Borrower Name</th>
                      <th className="py-2 px-4">Expected Return</th>
                      <th className="py-2 px-4 text-center">Status Badge</th>
                      <th className="py-2 px-4 text-center">Control Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[10.5px] font-semibold text-slate-700">
                    {records.map(rec => (
                      <tr key={rec.id} className="hover:bg-slate-50/30 transition-all">
                        <td className="py-2.5 px-4 font-mono font-black text-slate-500">{rec.id}</td>
                        <td className="py-2.5 px-4 font-bold text-slate-900 truncate max-w-[120px]" title={rec.bookTitle}>
                          {rec.bookTitle}
                        </td>
                        <td className="py-2.5 px-4">
                          <div className="flex items-center gap-1.5">
                            <span className={`px-1 py-0.5 text-[7px] font-black rounded uppercase ${rec.issuedToRole === 'Staff' ? 'bg-amber-100/80 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                              {rec.issuedToRole}
                            </span>
                            <span className="truncate max-w-[100px]">{rec.issuedTo}</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-4 font-mono text-slate-500">{rec.dueDate}</td>
                        <td className="py-2.5 px-4 text-center">
                          {rec.status === 'active' && (
                            <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-150 text-[7.5px] font-black rounded uppercase tracking-wider">
                              In Loan
                            </span>
                          )}
                          {rec.status === 'overdue' && (
                            <span className="px-1.5 py-0.5 bg-rose-50 text-rose-700 border border-rose-150 text-[7.5px] font-black rounded uppercase tracking-wider animate-pulse">
                              Overdue Warning
                            </span>
                          )}
                          {rec.status === 'returned' && (
                            <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-150 text-[7.5px] font-black rounded uppercase tracking-wider">
                              Returned Safe
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-4 text-center">
                          {rec.status !== 'returned' ? (
                            <button
                              onClick={() => handleReturnItem(rec.id)}
                              className="py-1 px-2.5 bg-emerald-600 hover:bg-emerald-750 text-white rounded-md text-[8.5px] font-black uppercase tracking-wider cursor-pointer shadow-3xs transition-all active:scale-95"
                            >
                              Check-In
                            </button>
                          ) : (
                            <span className="text-[9.5px] text-slate-400 italic">Logs Settled</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* FEATURE 3: BARCODE SUPPORT - VISUAL ISBN SCANNER GRAPHIC */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-3xs">
              <div className="flex justify-between items-center pb-3 border-b border-slate-150 mb-4">
                <div className="flex items-center gap-2">
                  <Barcode className="w-4.5 h-4.5 text-[#2563EB]" />
                  <span className="text-xs font-black uppercase text-slate-800 tracking-wider">Optical Integrated Barcode Scanner</span>
                </div>
                <span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[8.5px] font-bold rounded">LASER RECEPTOR</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                
                {/* Visual scanner mockup card graphic */}
                <div className="md:col-span-7 bg-slate-900 text-white p-4 rounded-xl relative overflow-hidden flex flex-col items-center justify-center select-none shadow-md h-40">
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span className="text-[8px] font-mono tracking-wider text-slate-400 font-bold uppercase">AIM SCANNER DEVICE</span>
                  </div>

                  {/* Red Laser Sweeper line layout */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-red-500 animate-bounce shadow-[0_0_8px_#EF4444]" />

                  {/* Pseudo Barcode Lines */}
                  <div className="flex items-stretch h-14 gap-1 transform scale-y-110 opacity-70">
                    <div className="w-1 bg-white" />
                    <div className="w-2 bg-white" />
                    <div className="w-0.5 bg-white" />
                    <div className="w-1.5 bg-white" />
                    <div className="w-1 bg-white" />
                    <div className="w-0.5 bg-white" />
                    <div className="w-3 bg-white" />
                    <div className="w-1 bg-white" />
                    <div className="w-1.5 bg-white" />
                    <div className="w-0.5 bg-white" />
                    <div className="w-1 bg-white" />
                    <div className="w-2.5 bg-white" />
                  </div>

                  <span className="text-[9px] font-mono tracking-[0.2em] text-slate-400 uppercase mt-4 block">ISBN INTEGRATED DECODER v2.60</span>
                </div>

                <div className="md:col-span-5 space-y-3">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase block tracking-wider">Automate Check-ins</span>
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                    Instantly decode barcode markers from physical books with one click. Speeds up inventory processing and return ledger entry.
                  </p>
                  
                  <button 
                    onClick={handleSimulateScan}
                    disabled={scanning}
                    className="w-full py-2 px-3 bg-slate-900 hover:bg-black disabled:bg-slate-400 text-white rounded-lg text-xs font-[800] tracking-wider transition-all uppercase flex items-center justify-center gap-2 cursor-pointer shadow-3xs"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${scanning ? 'animate-spin' : ''}`} />
                    <span>{scanning ? "Calibrating Optical Scan..." : "Simulate ISBN Scan"}</span>
                  </button>

                  {scanResult && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-2 border border-blue-200 bg-blue-50/50 rounded-lg text-center"
                    >
                      <p className="text-[9.5px] font-black text-slate-900 uppercase">Match: {scanResult.title}</p>
                      <span className="text-[8px] font-mono text-slate-400">Author: {scanResult.author}</span>
                    </motion.div>
                  )}
                </div>

              </div>
            </div>

            {/* FEATURE 4: OVERDUE ALERTS - WARNINGS & NOTIFICATIONS */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-3xs space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <Bell className="w-4.5 h-4.5 text-rose-500" />
                  <span className="text-xs font-black uppercase text-slate-800 tracking-wider">Escalated Overdue Warning Logs</span>
                </div>
                <span className="px-2 py-0.5 text-[8.5px] font-semibold rounded-full bg-rose-100 text-rose-700 font-sans tracking-wide">
                  Overdue Fine: ₹5/day
                </span>
              </div>

              <div className="space-y-3">
                {records.filter(r => r.status === 'overdue').map(entry => {
                  const dayOffset = 5; // Fixed hypothetical late duration
                  return (
                    <div 
                      key={entry.id}
                      className="p-3 bg-rose-50/50 hover:bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-between gap-3 text-left transition-all hover:border-rose-200/80"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[8px] px-1.5 py-0.5 bg-rose-600 text-white font-extrabold uppercase rounded">
                            DELAYED: 5 DAYS LATE
                          </span>
                          <span className="text-[11px] font-black text-slate-900">{entry.issuedTo}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-bold">
                          Assigned Item: <strong className="text-slate-700">{entry.bookTitle}</strong> (ISBN-{entry.id})
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-xs font-black text-rose-600 font-mono block">₹{entry.fineAmount} Fine</span>
                          <span className="text-[8.5px] text-slate-400 font-semibold block uppercase">Uncollected</span>
                        </div>
                        <button
                          onClick={() => triggerAuditNotification(entry.issuedTo, entry.bookTitle)}
                          className="py-1 px-2 border border-rose-200 hover:bg-rose-100 text-rose-600 rounded-lg text-[9px] font-black uppercase transition-all shadow-3xs cursor-pointer"
                        >
                          Alert Notify
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ==================== RIGHT COLUMN: LIBRARIAN'S CONTROL CENTER HERO ==================== */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* THE HERO MODULE: LIBRARIAN'S CONTROL CENTER */}
            <div className="bg-slate-900 text-white rounded-3xl p-5 border border-slate-800 shadow-md space-y-4 relative overflow-hidden">
              {/* Decorative design accent lines */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />

              <div className="space-y-1 border-b border-white/10 pb-3">
                <span className="text-[9px] uppercase tracking-widest text-[#2563EB] font-black">Hero Command</span>
                <h3 className="text-sm font-black text-white uppercase tracking-wider">Librarian's Control Panel</h3>
                <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">System dashboard for real-time check-out allocation</p>
              </div>

              {/* STYLISH DONUT / CAPACITY PROGRESS RINGS */}
              <div className="space-y-4 pt-2">
                
                {/* Ring 1 */}
                <div className="bg-slate-800/40 border border-slate-800 p-3.5 rounded-2xl flex items-center gap-4">
                  {/* SVG progress circle representing 68% */}
                  <div className="relative w-12 h-12 shrink-0 select-none">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="24" cy="24" r="19" stroke="#1E293B" strokeWidth="4.5" fill="none" />
                      <circle cx="24" cy="24" r="19" stroke="#3B82F6" strokeWidth="4.5" fill="none" strokeDasharray="119.38" strokeDashoffset={119.38 * (1 - dynamicCapacityRate / 100)} className="transition-all duration-700" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-black text-blue-400">
                      {Math.round(dynamicCapacityRate)}%
                    </div>
                  </div>
                  <div>
                    <h5 className="text-[10.5px] font-black uppercase text-white tracking-wide">Library Capacity Utilized</h5>
                    <p className="text-[9.5px] text-slate-400 font-semibold">{totalIssuedCount} out of {totalStock} copies currently in active loan</p>
                  </div>
                </div>

                {/* Ring 2 */}
                <div className="bg-slate-800/40 border border-slate-800 p-3.5 rounded-2xl flex items-center gap-4">
                  <div className="relative w-12 h-12 shrink-0 select-none">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="24" cy="24" r="19" stroke="#1E293B" strokeWidth="4.5" fill="none" />
                      <circle cx="24" cy="24" r="19" stroke="#10B981" strokeWidth="4.5" fill="none" strokeDasharray="119.38" strokeDashoffset="6.5" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-black text-emerald-400">
                      94.5%
                    </div>
                  </div>
                  <div>
                    <h5 className="text-[10.5px] font-black uppercase text-white tracking-wide">On-Time Returns Rate</h5>
                    <p className="text-[9.5px] text-slate-400 font-semibold">Autonomous calculations offset delayed checks immediately</p>
                  </div>
                </div>

              </div>

              {/* QUICK TRANSACTION ACTION FORM */}
              <form onSubmit={handleQuickIssue} className="pt-4 border-t border-white/10 space-y-3">
                <span className="text-[9.5px] text-slate-400 uppercase font-black block tracking-wider">Issue Out Reference Resource</span>
                
                <div className="space-y-2">
                  <select
                    value={quickIssueBookId}
                    onChange={(e) => setQuickIssueBookId(e.target.value)}
                    className="w-full bg-slate-850 border border-slate-800 text-slate-200 text-[10px] py-2 px-2.5 rounded-xl focus:outline-none"
                  >
                    <option value="">-- Choose Volume Target --</option>
                    {books.map(b => (
                      <option key={b.id} value={b.id} disabled={b.availableCopies === 0}>
                        {b.title} ({b.availableCopies} left)
                      </option>
                    ))}
                  </select>

                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      type="button" 
                      onClick={() => setQuickRole('Student')}
                      className={`py-1 rounded text-[9px] font-black uppercase tracking-wider text-center cursor-pointer transition-all border ${quickRole === 'Student' ? 'bg-blue-600/25 border-blue-500 text-blue-400' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                    >
                      Student
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setQuickRole('Staff')}
                      className={`py-1 rounded text-[9px] font-black uppercase tracking-wider text-center cursor-pointer transition-all border ${quickRole === 'Staff' ? 'bg-blue-600/25 border-blue-500 text-blue-400' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                    >
                      Staff
                    </button>
                  </div>

                  <input 
                    type="text"
                    value={quickRecipient}
                    onChange={(e) => setQuickRecipient(e.target.value)}
                    placeholder="Recipient Full Name / Code"
                    className="w-full bg-slate-850 border border-slate-800 text-white placeholder-slate-500 text-[10px] p-2 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-2 bg-[#2563EB] hover:bg-blue-700 text-white text-[10.5px] font-black uppercase tracking-wider rounded-xl cursor-pointer transition-all active:scale-[0.98]"
                >
                  Allocate Loan
                </button>
              </form>
            </div>

            {/* LIVE FEEDS & RECENT ACTIVITIES */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-3xs space-y-4">
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span>Recent Activities Tracker</span>
                </h4>
                <p className="text-[9.5px] text-slate-400 font-semibold mt-0.5">Real-time system telemetry check-in streams</p>
              </div>

              <div className="space-y-3.5 pt-1">
                {feed.map(item => (
                  <div key={item.id} className="flex items-start gap-2.5 text-xs text-slate-600 border-l-2 border-slate-200 pl-3.5 py-0.5 ml-1">
                    <div className="flex-1 min-w-0">
                      <p className="text-[11.5px] font-medium text-slate-700 leading-tight">
                        {item.text}
                      </p>
                      <span className="text-[9px] text-slate-400 font-mono font-bold block mt-1">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* MODAL DIALOG: LIBRARY GENERAL ASSET SPECIFICATION & ENROLLMENT */}
      {isRegisterOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xs z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl max-w-sm w-full p-6 border border-slate-200 shadow-xl space-y-4"
          >
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Register Reference Volume</h3>
              <button 
                onClick={() => setIsRegisterOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRegisterBook} className="space-y-3.5 text-left text-[11px]">
              
              <div className="space-y-1">
                <label className="text-[8.5px] font-extrabold uppercase text-slate-400">Book Title Metadata *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Principia Mathematica"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs font-bold p-2 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-805"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[8.5px] font-extrabold uppercase text-slate-400">Author name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Sir Isaac Newton"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs font-bold p-2 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-805"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[8.5px] font-extrabold uppercase text-slate-400">ISBN Code Prefix *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. 978-0198503"
                  value={newIsbn}
                  onChange={(e) => setNewIsbn(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs font-bold p-2 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-805"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[8.5px] font-extrabold uppercase text-slate-400">Total copies *</label>
                  <input 
                    type="number" 
                    min="1"
                    required
                    value={newCopies}
                    onChange={(e) => setNewCopies(parseInt(e.target.value) || 10)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs font-bold p-2 rounded-xl text-center focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-805"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[8.5px] font-extrabold uppercase text-slate-400">Classification</label>
                  <select 
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs font-bold p-2 rounded-xl focus:outline-none text-slate-650"
                  >
                    <option value="Science & Physics">Science & Physics</option>
                    <option value="Science & Chemistry">Science & Chemistry</option>
                    <option value="Economics">Economics</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Literature">Literature</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex gap-2">
                <button 
                  type="button" 
                  onClick={() => setIsRegisterOpen(false)}
                  className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-all cursor-pointer uppercase text-[10px]"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-1.5 bg-[#2563EB] hover:bg-blue-750 text-white font-bold rounded-lg transition-all cursor-pointer uppercase text-[10px]"
                >
                  Confirm Asset
                </button>
              </div>

            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
};
