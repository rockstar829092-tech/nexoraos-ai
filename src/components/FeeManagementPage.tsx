import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  DollarSign, 
  Receipt, 
  CreditCard, 
  Plus, 
  Search, 
  X, 
  Filter, 
  Calculator, 
  ArrowLeft, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Send, 
  Bell, 
  Clock, 
  Sliders, 
  Layers, 
  Download, 
  Sparkles, 
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  Trash2,
  LockIcon,
  Smartphone,
  Printer,
  MoreVertical,
  QrCode,
  MessageSquare,
  ArrowUpRight,
  Wallet,
  PieChart,
  BarChart3
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

const QUARTERLY_DATA = [
  { quarter: 'Q1 2025', collected: 12.5, pending: 2.1, target: 15.0 },
  { quarter: 'Q2 2025', collected: 14.8, pending: 1.2, target: 16.0 },
  { quarter: 'Q3 2025', collected: 11.2, pending: 3.8, target: 15.0 },
  { quarter: 'Q4 2025', collected: 15.9, pending: 0.5, target: 17.0 },
];

interface FeeManagementPageProps {
  onBack: () => void;
}

export const FeeManagementPage: React.FC<FeeManagementPageProps> = ({ onBack }) => {
  const [activePaymentMethod, setActivePaymentMethod] = useState<'card' | 'bank' | 'upi'>('card');
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [autoReminders, setAutoReminders] = useState(true);

  // Mock handlers
  const handleSimulatePayment = () => {
    setIsPaymentProcessing(true);
    setTimeout(() => {
      setIsPaymentProcessing(false);
      setPaymentSuccess(true);
      setTimeout(() => setPaymentSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-700 pb-20">
      {/* 1. PREMIUM HEADER */}
      <header className="sticky top-0 z-50 bg-white/80  border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <motion.button 
              whileHover={{ x: -4 }}
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-100 transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Main Dashboard</span>
            </motion.button>
            <div className="h-8 w-px bg-slate-200 hidden md:block" />
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-blue-200">
                MODULE 05
              </span>
              <div>
                <h1 className="text-xl font-black tracking-tight text-slate-900">AI-Powered Fee Management Hub</h1>
                <p className="text-xs text-slate-500 font-medium">Smart financial automation, collection tracking, and AI payment workflows.</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">System Status</span>
              <span className="text-xs font-black text-slate-900">Ledger Integrated • Secure</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN - 60% */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* A. ONLINE FEE COLLECTION */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <CreditCard className="w-24 h-24 text-blue-600" />
              </div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Online Fee Collection</h3>
                  <p className="text-xs text-slate-500 font-medium">Process one-time or recurring school fees securely.</p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Student Identity</label>
                    <input type="text" placeholder="e.g. Aarav Sharma" className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Amount (INR)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                      <input type="number" placeholder="0.00" className="w-full bg-white border border-slate-200 pl-7 pr-4 py-2.5 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Select Payment Method</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'card', name: 'Credit Card', icon: CreditCard },
                      { id: 'bank', name: 'Net Banking', icon: ShieldCheck },
                      { id: 'upi', name: 'UPI Pay', icon: Smartphone }
                    ].map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setActivePaymentMethod(method.id as any)}
                        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                          activePaymentMethod === method.id 
                          ? 'bg-blue-50 border-blue-600 text-blue-600' 
                          : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                        }`}
                      >
                        <method.icon className="w-5 h-5" />
                        <span className="text-[10px] font-black uppercase tracking-tighter">{method.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {activePaymentMethod === 'upi' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-3 py-4 border-2 border-dashed border-slate-200 rounded-2xl bg-white"
                  >
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <QrCode className="w-32 h-32 text-slate-800" />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center px-4">
                      Scan this QR with any UPI app (GPay, PhonePe, Paytm)
                    </p>
                  </motion.div>
                )}

                <button 
                  onClick={handleSimulatePayment}
                  disabled={isPaymentProcessing}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-[0.1em] text-sm shadow-xl shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all relative overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    {isPaymentProcessing ? (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center gap-3"
                      >
                        <RefreshCw className="w-5 h-5" />
                        <span>Authorizing Handshake...</span>
                      </motion.div>
                    ) : paymentSuccess ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-2 text-emerald-300"
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span>Payment Confirmed</span>
                      </motion.div>
                    ) : (
                      <motion.span>Initiate Secure Transaction</motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </motion.section>

            {/* B. INVOICE GENERATION */}
            <section className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                    <Receipt className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Invoice Intelligence</h3>
                    <p className="text-xs text-slate-500 font-medium">Auto-generated tax-compliant digital receipts.</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 cursor-pointer">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 cursor-pointer">
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* MOCK INVOICE UI */}
              <div className="border border-slate-100 rounded-3xl p-8 bg-slate-50/50 space-y-8">
                <div className="flex justify-between items-start">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center transform -rotate-12">
                        <span className="text-white font-black">N</span>
                      </div>
                      <span className="text-lg font-black tracking-tighter">NEXORA ACADEMY</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase leading-relaxed">
                      124, Fintech Plaza, Hitech City<br />Hyderabad, TS - 500081
                    </div>
                  </div>
                  <div className="text-right">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter">INVOICE</h2>
                    <span className="text-xs font-mono font-bold text-blue-600">#NX-2041-0082</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 border-t border-slate-200 pt-6">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Bill To</span>
                    <p className="text-sm font-black text-slate-800 mt-1">Mr. Suresh Sharma</p>
                    <p className="text-xs text-slate-500 font-medium">(Parent of Aarav Sharma, Class X-A)</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Due Date</span>
                    <p className="text-sm font-black text-slate-800 mt-1">15th May, 2026</p>
                  </div>
                </div>

                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-2 text-left font-black uppercase tracking-widest text-slate-400">Description</th>
                      <th className="py-2 text-right font-black uppercase tracking-widest text-slate-400">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-3 font-bold text-slate-700">Annual Tuition Fee (Term 1)</td>
                      <td className="py-3 text-right font-bold text-slate-900">₹45,000.00</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-bold text-slate-700">Lab & Sports Resource Allocation</td>
                      <td className="py-3 text-right font-bold text-slate-900">₹8,500.00</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-bold text-slate-700">Transport (Optional)</td>
                      <td className="py-3 text-right font-bold text-slate-900">₹12,400.00</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-slate-200">
                      <td className="py-4 font-black uppercase text-slate-400">Subtotal</td>
                      <td className="py-4 text-right font-black text-slate-900">₹65,900.00</td>
                    </tr>
                    <tr className="bg-blue-600 text-white rounded-xl">
                      <td className="py-3 px-4 font-black uppercase rounded-l-xl">Grand Total Due</td>
                      <td className="py-3 px-4 text-right font-black text-xl rounded-r-xl">₹65,900.00</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </section>

            {/* C. PAYMENT REMINDERS */}
            <section className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm overflow-hidden relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                  <Bell className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">AI Reminder Automation</h3>
                  <p className="text-xs text-slate-500 font-medium">Smart notification triggers for multi-channel outreach.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <div>
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">Auto-Pilot Mode</h4>
                      <p className="text-[10px] text-slate-500 font-medium mt-0.5">Automate WhatsApp/SMS Reminders</p>
                    </div>
                    <button 
                      onClick={() => setAutoReminders(!autoReminders)}
                      className={`w-12 h-6 rounded-full transition-all relative cursor-pointer ${autoReminders ? 'bg-blue-600' : 'bg-slate-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${autoReminders ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Dynamic Template Editor</label>
                    <div className="relative">
                      <textarea 
                        className="w-full h-32 bg-slate-50 border border-slate-200 rounded-xl p-4 text-[11px] font-medium leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-700"
                        defaultValue="Dear Parent, This is a gentle reminder regarding the outstanding for [StudentName] totaling [Amount]. Kindly clear this by [DueDate] to avoid service disruption. Pay here: [Link]"
                      />
                      <div className="absolute bottom-2 right-2 flex gap-1">
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[8px] font-black rounded border border-blue-200 uppercase">[StudentName]</span>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[8px] font-black rounded border border-blue-200 uppercase">[Amount]</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-[#0F172A] text-white rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 group transition-all cursor-pointer">
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    <span>Run Manual Pulse Dispatch</span>
                  </button>
                </div>

                {/* NOTIFICATION PREVIEW */}
                <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center block">Visual Mock Preview</span>
                  
                  {/* WhatsApp style */}
                  <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 shadow-sm relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500/20" />
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-[10px] font-black uppercase text-emerald-700 tracking-wider">WhatsApp Alert</span>
                    </div>
                    <p className="text-[11px] text-slate-700 font-semibold leading-relaxed">
                      "Dear Parent, Outstanding dues of ₹12,400 for Aarav Sharma remain pending..."
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-[9px] text-emerald-600 font-black">Link: nexora.pay/at42</span>
                      <span className="text-[8px] text-slate-400 font-mono">10:42 AM</span>
                    </div>
                  </motion.div>

                  {/* SMS style */}
                  <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white">
                        <Smartphone className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] font-black uppercase text-blue-700 tracking-wider">SMS Gateway</span>
                    </div>
                    <p className="text-[11px] text-slate-700 font-semibold">
                      Your ward's Tuition fee is overdue by 12 days. Click here to avoid penalty.
                    </p>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* D. FEE REPORTS & E. PENDING TRACKING */}
            <section className="bg-white border border-slate-200 rounded-[24px] p-0 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Analytics & Defaulters</h3>
                    <p className="text-xs text-slate-500 font-medium">Real-time financial visibility and risk indicators.</p>
                  </div>
                </div>
                <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200">
                  <button className="px-3 py-1.5 bg-white text-blue-600 rounded-lg text-[10px] font-black shadow-sm uppercase tracking-wider">Live Log</button>
                  <button className="px-3 py-1.5 text-slate-400 rounded-lg text-[10px] font-black uppercase tracking-wider">Monthly</button>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Month Target", value: "₹42.5L", color: "text-slate-900", sub: "Goal Tracked" },
                  { label: "Successful", value: "₹38.2L", color: "text-emerald-600", sub: "90% Achieved" },
                  { label: "Pending", value: "₹4.3L", color: "text-rose-500", sub: "Risk Index" },
                ].map((stat, i) => (
                  <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl relative overflow-hidden group">
                    <div className="absolute bottom-0 right-0 p-2 opacity-5">
                      <PieChart className="w-12 h-12" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-1">{stat.label}</span>
                    <h4 className={`text-xl font-black ${stat.color} tracking-tight`}>{stat.value}</h4>
                    <span className="text-[10px] font-bold text-slate-400 mt-1 block">{stat.sub}</span>
                  </div>
                ))}
              </div>

              {/* QUARTERLY TRENDS CHART */}
              <div className="px-6 mb-8">
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-blue-600" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Quarterly Collection Intelligence</span>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                        <span className="text-[9px] font-black uppercase text-slate-400">Collected</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                        <span className="text-[9px] font-black uppercase text-slate-400">Pending</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={QUARTERLY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis 
                          dataKey="quarter" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 700 }}
                          dy={10}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 700 }}
                        />
                        <Tooltip 
                          cursor={{ fill: '#F1F5F9' }}
                          contentStyle={{ 
                            borderRadius: '16px', 
                            border: '1px solid #E2E8F0',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            padding: '12px'
                          }}
                          itemStyle={{ padding: '2px 0' }}
                        />
                        <Bar 
                          dataKey="collected" 
                          fill="#2563EB" 
                          radius={[6, 6, 0, 0]} 
                          barSize={32}
                        />
                        <Bar 
                          dataKey="pending" 
                          fill="#E2E8F0" 
                          radius={[6, 6, 0, 0]} 
                          barSize={32}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 overflow-x-auto">
                <table className="w-full text-left text-[11px] border-collapse">
                  <thead>
                    <tr className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 border-b border-slate-100">
                      <th className="py-4">Student Profile</th>
                      <th className="py-4">Status</th>
                      <th className="py-4">Due Balance</th>
                      <th className="py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      { name: "Vihaan Agarwal", grade: "XII-B", amount: "₹18,500", status: "15 Days Overdue", priority: "high" },
                      { name: "Ananya Mehta", grade: "X-A", amount: "₹12,400", status: "22 Days Overdue", priority: "critical" },
                      { name: "Kabir Dev", grade: "VIII-C", amount: "₹9,200", status: "4 Days Overdue", priority: "medium" },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-200 font-black text-[10px] flex items-center justify-center text-slate-500">{row.name[0]}</div>
                            <div>
                              <p className="font-black text-slate-800">{row.name}</p>
                              <span className="text-[9px] text-slate-400 font-bold uppercase">{row.grade}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-tighter border ${
                            row.priority === 'critical' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="py-4 font-black font-mono text-slate-700">{row.amount}</td>
                        <td className="py-4 text-right">
                          <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all cursor-pointer shadow-sm group-hover:scale-105">
                            Issue Notice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN - 40% (HERO VISUAL AREA) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* BURSAR'S LEDGER CENTER */}
            <div className="sticky top-28 space-y-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#0F172A] rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-900/20"
              >
                {/* Visual Decorations */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] -z-0 pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] -z-0 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-[size:20px_20px]" />

                <div className="relative z-10 space-y-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-[0.2em] text-blue-400 mb-1">Financial Intelligence</h4>
                      <h2 className="text-2xl font-black tracking-tight leading-none">Bursar's Ledger Center</h2>
                    </div>
                    <div className="p-3 bg-white/5  rounded-2xl border border-white/10">
                      <Wallet className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>

                  {/* LARGE DONUT CHART MOCKUP */}
                  <div className="flex flex-col items-center py-6">
                    <div className="relative w-48 h-48">
                      {/* SVG Ring Simulation */}
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="96" cy="96" r="88" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                        <motion.circle 
                          initial={{ strokeDasharray: "0 553" }}
                          animate={{ strokeDasharray: "470 553" }}
                          transition={{ duration: 2, ease: "easeOut" }}
                          cx="96" cy="96" r="88" fill="transparent" stroke="#2563EB" strokeWidth="12" strokeLinecap="round" 
                        />
                        <motion.circle 
                          initial={{ strokeDasharray: "0 553" }}
                          animate={{ strokeDasharray: "80 553" }}
                          transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                          cx="96" cy="96" r="88" fill="transparent" stroke="#fb923c" strokeWidth="12" strokeLinecap="round" 
                          className="transform rotate-[270deg] origin-center"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <motion.span 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-4xl font-black font-mono tracking-tighter"
                        >
                          85%
                        </motion.span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Collected</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-6 mt-8">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                        <span className="text-[10px] font-bold text-slate-300">Target Range</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-orange-400" />
                        <span className="text-[10px] font-bold text-slate-300">Pending Dues</span>
                      </div>
                    </div>
                  </div>

                  {/* FLOATING QUICK STATS */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Outstanding Rev", val: "₹18.4L", trend: "-4%", up: false },
                      { label: "Auto Pay Rate", val: "72.4%", trend: "+12%", up: true },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white/5  border border-white/10 p-4 rounded-2xl flex flex-col justify-between h-24">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{stat.label}</span>
                        <div className="flex items-baseline justify-between">
                          <h5 className="text-xl font-black font-mono tracking-tight">{stat.val}</h5>
                          <div className={`flex items-center gap-0.5 text-[10px] font-black ${stat.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <div className="w-3 h-3 border-b-2 border-r-2 rotate-45" />}
                            {stat.trend}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* LIVE ACTIVITY FEED */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center px-1">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Live Transaction Matrix</span>
                      <span className="text-[9px] font-mono text-emerald-500 font-black">STREAMING_ACTIVE</span>
                    </div>

                    <div className="space-y-2">
                      {[
                        { title: "UPI Settlement Clear", student: "Aarav Sharma", time: "2 min ago", type: "success" },
                        { title: "Invoice Generated", student: "Parent ID #2041", time: "14 min ago", type: "info" },
                        { title: "Reminder Dispatched", student: "Maya Kapoor", time: "28 min ago", type: "alert" },
                      ].map((item, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.2 }}
                          className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors"
                        >
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            item.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 
                            item.type === 'alert' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                          }`}>
                            {item.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h6 className="text-[11px] font-black text-slate-100 truncate uppercase tracking-tight">{item.title}</h6>
                            <p className="text-[9px] text-slate-500 font-bold">{item.student} • {item.time}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-600" />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>

              {/* FLOATING NOTIFICATION MOCKUP */}
              <div className="bg-emerald-500 text-white p-4 rounded-2xl shadow-xl shadow-emerald-200 border border-emerald-400 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 text-white/10">
                  <LockIcon className="w-12 h-12" />
                </div>
                <div className="flex items-start gap-3 relative z-10">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-widest">Bank Reconciliation Active</h5>
                    <p className="text-[10px] font-medium text-emerald-50 mt-1">Smart audit successfully matched 100% payments with HDFC Gateway ledger records.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
};
