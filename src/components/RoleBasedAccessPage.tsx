import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  LockIcon, 
  Shield, 
  Check, 
  X, 
  AlertTriangle, 
  Building2, 
  Users, 
  Key, 
  Eye, 
  FileText, 
  TrendingUp, 
  Settings,
  ChevronRight,
  Info,
  Fingerprint,
  UserCheck,
  EyeOff
} from 'lucide-react';

interface RoleBasedAccessPageProps {
  onBack: () => void;
}

const PermissionRow: React.FC<{ label: string; roles: (boolean | string)[] }> = ({ label, roles }) => (
  <tr className="hover:bg-slate-50 transition-colors border-b border-slate-100">
    <td className="px-6 py-4 text-sm font-black text-slate-800 uppercase tracking-tight">{label}</td>
    {roles.map((hasAccess, idx) => (
      <td key={idx} className="px-6 py-4 text-center">
        {typeof hasAccess === 'boolean' ? (
          hasAccess ? (
            <div className="flex justify-center">
              <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-full">
                <Check className="w-4 h-4" />
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="p-1.5 bg-rose-50 text-rose-300 rounded-full">
                <X className="w-4 h-4" />
              </div>
            </div>
          )
        ) : (
          <span className="text-[10px] font-black text-blue-600 uppercase bg-blue-50 px-2 py-1 rounded-lg">
            {hasAccess}
          </span>
        )}
      </td>
    ))}
  </tr>
);

export const RoleBasedAccessPage: React.FC<RoleBasedAccessPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-700 pb-20">
      
      {/* 1. PREMIUM HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button 
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-2xl font-bold text-sm hover:bg-blue-100 transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </motion.button>
            <div className="h-8 w-px bg-slate-200" />
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-[#2563EB] text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-blue-100">
                SECURITY MODULE
              </span>
              <div>
                <h1 className="text-xl font-black tracking-tight text-slate-900 uppercase">Role-Based Access Control (RBAC)</h1>
                <p className="text-xs text-slate-500 font-medium hidden md:block">Complete control over who can access which information inside NexoraOS AI.</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        
        {/* SECTION 1: OWNER'S BIGGEST FEAR */}
        <section>
          <div className="bg-white border-2 border-slate-200 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5">
               <AlertTriangle className="w-64 h-64" />
            </div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                 <div className="flex items-center gap-4">
                    <div className="p-4 bg-rose-50 text-rose-600 rounded-[28px]">
                       <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Worried About Data Leaks?</h2>
                 </div>
                 <div className="space-y-6">
                    <div className="flex items-center gap-4 group">
                       <div className="w-10 h-10 border-2 border-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:border-rose-200 group-hover:text-rose-500 transition-colors">
                          <X className="w-5 h-5" />
                       </div>
                       <p className="text-lg font-bold text-slate-600">Can teachers see payroll?</p>
                    </div>
                    <div className="flex items-center gap-4 group">
                       <div className="w-10 h-10 border-2 border-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:border-rose-200 group-hover:text-rose-500 transition-colors">
                          <X className="w-5 h-5" />
                       </div>
                       <p className="text-lg font-bold text-slate-600">Can parents see other students' marks?</p>
                    </div>
                    <div className="flex items-center gap-4 group">
                       <div className="w-10 h-10 border-2 border-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:border-rose-200 group-hover:text-rose-500 transition-colors">
                          <X className="w-5 h-5" />
                       </div>
                       <p className="text-lg font-bold text-slate-600">Can staff access financial reports?</p>
                    </div>
                 </div>
              </div>
              
              <div className="bg-blue-600 p-8 md:p-12 rounded-[32px] text-white text-center space-y-6 shadow-xl shadow-blue-200">
                 <h3 className="text-5xl font-black uppercase italic tracking-tighter">Absolutely Not.</h3>
                 <p className="text-blue-100 font-medium leading-relaxed">
                    Only users with administrator-approved permissions can access specific modules. NexoraOS AI enforces strict data isolation at the core level.
                 </p>
                 <div className="pt-4 border-t border-white/20">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">100% Permission Controlled</span>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: HOTEL ANALOGY */}
        <section className="text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Think of NexoraOS Like a Secure Hotel</h2>
              <p className="text-slate-500 max-w-2xl mx-auto font-medium">Data access in NexoraOS mimics high-end hospitality security protocols.</p>
            </div>
            
            <div className="max-w-4xl mx-auto">
               <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12">
                  <div className="w-full md:w-64 space-y-3">
                     <div className="p-6 bg-slate-900 text-white rounded-[32px] shadow-xl">
                        <Building2 className="w-8 h-8 mx-auto mb-3" />
                        <h4 className="text-xs font-black uppercase tracking-widest">Hotel Owner</h4>
                     </div>
                     <p className="text-[10px] font-bold text-slate-400 uppercase">Has master keys to all floors</p>
                  </div>
                  <ChevronRight className="hidden md:block w-8 h-8 text-slate-200 rotate-90 md:rotate-0" />
                  <div className="w-full md:w-64 space-y-3">
                     <div className="p-6 bg-blue-600 text-white rounded-[32px] shadow-xl">
                        <Users className="w-8 h-8 mx-auto mb-3" />
                        <h4 className="text-xs font-black uppercase tracking-widest">Manager</h4>
                     </div>
                     <p className="text-[10px] font-bold text-slate-400 uppercase">Access to operational areas</p>
                  </div>
                  <ChevronRight className="hidden md:block w-8 h-8 text-slate-200 rotate-90 md:rotate-0" />
                  <div className="w-full md:w-64 space-y-3">
                     <div className="p-6 bg-white border border-slate-200 text-slate-900 rounded-[32px] shadow-sm">
                        <Key className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                        <h4 className="text-xs font-black uppercase tracking-widest">Guests</h4>
                     </div>
                     <p className="text-[10px] font-bold text-slate-400 uppercase">Only their assigned room</p>
                  </div>
               </div>
               
               <div className="mt-12 p-8 bg-slate-50 border border-slate-100 rounded-[40px] text-left max-w-2xl mx-auto">
                  <p className="text-slate-600 font-medium leading-loose">
                    A hotel guest can only open their own room. They cannot access the manager's office. They cannot access financial records. <span className="text-blue-600 font-black">NexoraOS works exactly the same way.</span> Users only access areas explicitly assigned to them by the Super Admin.
                  </p>
               </div>
            </div>
        </section>

        {/* SECTION 3: WHO CAN SEE WHAT? */}
        <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Who Can See What?</h2>
              <p className="text-slate-500 font-medium">Standard baseline roles configured for maximum privacy.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {/* Role Card: SUPER ADMIN */}
               <div className="bg-white border border-slate-200 rounded-[40px] p-8 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all">
                  <div>
                    <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-6 inline-block">
                      Full Access
                    </span>
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-6">Super Admin</h3>
                    <div className="space-y-3">
                       {['Finance', 'Payroll', 'Reports', 'Admissions', 'Analytics', 'System Settings', 'All Modules'].map(item => (
                         <div key={item} className="flex items-center gap-2">
                           <Check className="w-3.5 h-3.5 text-emerald-500" />
                           <span className="text-xs font-black text-slate-700 uppercase tracking-tight">{item}</span>
                         </div>
                       ))}
                    </div>
                  </div>
               </div>

               {/* Role Card: TEACHER */}
               <div className="bg-white border border-slate-200 rounded-[40px] p-8 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all">
                  <div>
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-6 inline-block">
                      Restricted Academic
                    </span>
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-6">Teacher</h3>
                    <div className="space-y-3 mb-6">
                       {['Assigned Classes', 'Attendance', 'Marks Entry', 'Homework'].map(item => (
                         <div key={item} className="flex items-center gap-2">
                           <Check className="w-3.5 h-3.5 text-emerald-500" />
                           <span className="text-xs font-black text-slate-700 uppercase tracking-tight">{item}</span>
                         </div>
                       ))}
                    </div>
                    <div className="space-y-3 border-t border-slate-50 pt-4">
                       {['Payroll', 'Revenue', 'Financial Reports', 'System Settings'].map(item => (
                         <div key={item} className="flex items-center gap-2 opacity-50">
                           <X className="w-3.5 h-3.5 text-rose-500" />
                           <span className="text-xs font-bold text-slate-400 uppercase tracking-tight">{item}</span>
                         </div>
                       ))}
                    </div>
                  </div>
               </div>

               {/* Role Card: PARENT */}
               <div className="bg-white border border-slate-200 rounded-[40px] p-8 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all">
                  <div>
                    <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-6 inline-block">
                      Personal View Only
                    </span>
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-6">Parent</h3>
                    <div className="space-y-3 mb-6">
                       {['Own Child\'s Attendance', 'Own Child\'s Results', 'Own Child\'s Fees'].map(item => (
                         <div key={item} className="flex items-center gap-2">
                           <Check className="w-3.5 h-3.5 text-emerald-500" />
                           <span className="text-xs font-black text-slate-700 uppercase tracking-tight">{item}</span>
                         </div>
                       ))}
                    </div>
                    <div className="space-y-3 border-t border-slate-50 pt-4">
                       {['Other Students', 'Staff Data', 'School Accounts'].map(item => (
                         <div key={item} className="flex items-center gap-2 opacity-50">
                           <X className="w-3.5 h-3.5 text-rose-500" />
                           <span className="text-xs font-bold text-slate-400 uppercase tracking-tight">{item}</span>
                         </div>
                       ))}
                    </div>
                  </div>
               </div>

               {/* Role Card: STUDENT */}
               <div className="bg-white border border-slate-200 rounded-[40px] p-8 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all">
                  <div>
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-6 inline-block">
                      Personal Dashboard
                    </span>
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-6">Student</h3>
                    <div className="space-y-3 mb-6">
                       {['Own Assignments', 'Own Results', 'Own Attendance'].map(item => (
                         <div key={item} className="flex items-center gap-2">
                           <Check className="w-3.5 h-3.5 text-emerald-500" />
                           <span className="text-xs font-black text-slate-700 uppercase tracking-tight">{item}</span>
                         </div>
                       ))}
                    </div>
                    <div className="space-y-3 border-t border-slate-50 pt-4">
                       {['Other Student Data', 'Admin Info', 'Financial Info'].map(item => (
                         <div key={item} className="flex items-center gap-2 opacity-50">
                           <X className="w-3.5 h-3.5 text-rose-500" />
                           <span className="text-xs font-bold text-slate-400 uppercase tracking-tight">{item}</span>
                         </div>
                       ))}
                    </div>
                  </div>
               </div>
            </div>
        </section>

        {/* SECTION 4: LIVE PERMISSION CONTROL CENTER */}
        <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Live Permission Control</h2>
              <p className="text-slate-500 font-medium">The administrator can grant or revoke any permission instantly.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-[40px] p-8 md:p-12 shadow-sm max-w-4xl mx-auto">
               <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
                  <div className="flex items-center gap-4">
                     <div className="w-16 h-16 rounded-3xl bg-blue-50 flex items-center justify-center font-black text-blue-600 text-xl shadow-inner uppercase">
                        PS
                     </div>
                     <div>
                        <h4 className="text-xl font-black text-slate-900">Priya Sharma</h4>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Role: Senior Teacher</p>
                     </div>
                  </div>
                  <div className="px-6 py-3 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3">
                     <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                     <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Custom Permissions Applied</span>
                  </div>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Attendance', active: true },
                    { label: 'Marks Entry', active: true },
                    { label: 'Homework', active: true },
                    { label: 'LMS', active: true },
                    { label: 'Payroll', active: false },
                    { label: 'Fee Management', active: false },
                    { label: 'Financial Reports', active: false },
                    { label: 'Settings', active: false },
                  ].map(perm => (
                    <div key={perm.label} className={`p-5 rounded-[28px] border-2 transition-all flex flex-col items-center gap-3 ${
                      perm.active 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200 scale-105' 
                        : 'bg-white border-slate-100 text-slate-300'
                    }`}>
                       {perm.active ? <Check className="w-6 h-6" /> : <LockIcon className="w-6 h-6 opacity-30" />}
                       <span className="text-[10px] font-black uppercase tracking-tight text-center">{perm.label}</span>
                    </div>
                  ))}
               </div>
               
               <div className="mt-12 flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                  <Info className="w-5 h-5 text-slate-400 shrink-0" />
                  <p className="text-[11px] text-slate-500 font-medium">As a Super Admin, you have granular control. You can allow a teacher to mark attendance but block them from viewing fees with a single toggle.</p>
               </div>
            </div>
        </section>

        {/* SECTION 5: PERMISSION MATRIX */}
        <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Permission Matrix</h2>
              <p className="text-slate-500 font-medium">A visual overview of visibility across the school ecosystem.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-[40px] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="px-6 py-6 text-left text-[11px] font-black uppercase tracking-widest">Module</th>
                      <th className="px-6 py-6 text-center text-[11px] font-black uppercase tracking-widest">Owner</th>
                      <th className="px-6 py-6 text-center text-[11px] font-black uppercase tracking-widest">Teacher</th>
                      <th className="px-6 py-6 text-center text-[11px] font-black uppercase tracking-widest">Parent</th>
                      <th className="px-6 py-6 text-center text-[11px] font-black uppercase tracking-widest">Student</th>
                      <th className="px-6 py-6 text-center text-[11px] font-black uppercase tracking-widest">Accountant</th>
                    </tr>
                  </thead>
                  <tbody>
                    <PermissionRow label="Attendance" roles={[true, true, "Child Only", "Own Only", true]} />
                    <PermissionRow label="Marks & Exams" roles={[true, true, "Child Only", "Own Only", false]} />
                    <PermissionRow label="Fee Records" roles={[true, false, "Child Only", "Own Only", true]} />
                    <PermissionRow label="Payroll" roles={[true, false, false, false, false]} />
                    <PermissionRow label="Admissions" roles={[true, false, false, false, "Lead Only"]} />
                    <PermissionRow label="Reports" roles={[true, "Academic", false, false, false]} />
                    <PermissionRow label="Settings" roles={[true, false, false, false, false]} />
                    <PermissionRow label="Analytics" roles={[true, false, false, false, "Financial"]} />
                  </tbody>
                </table>
              </div>
            </div>
        </section>

        {/* SECTION 6: WHY SCHOOL OWNERS TRUST THIS */}
        <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Why School Owners Trust NexoraOS</h2>
              <p className="text-slate-500 font-medium">Enterprise-grade security foundations for institutional stability.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
               {[
                 { title: 'Role-Based Access Control', desc: 'Pre-configured logical roles that separate duties effectively.', icon: UserCheck },
                 { title: 'Module-Level Security', desc: 'Locks down entire modules like Finance or HR for unauthorized users.', icon: LockIcon },
                 { title: 'User-Level Permissions', desc: 'Granular control over individual user actions and data visibility.', icon: Settings },
                 { title: 'Audit Logging', desc: 'Tracks who accessed what data and when for complete oversight.', icon: FileText },
                 { title: 'Administrator Control', desc: 'The Super Admin is the ultimate authority on all data access.', icon: Fingerprint },
                 { title: 'Data Visibility Protection', desc: 'Ensures sensitive student and staff data never leaks across roles.', icon: EyeOff },
               ].map(feat => (
                 <div key={feat.title} className="p-8 bg-white border border-slate-100 rounded-[40px] hover:shadow-xl transition-all group">
                    <div className="p-4 bg-blue-50 text-blue-600 rounded-3xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform">
                       <feat.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-3">{feat.title}</h4>
                    <p className="text-[11px] text-slate-500 font-bold leading-relaxed uppercase tracking-widest">{feat.desc}</p>
                 </div>
               ))}
            </div>
        </section>

        {/* SECTION 7: FINAL TRUST BANNER */}
        <section>
           <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-[60px] p-12 md:p-20 text-white text-center relative overflow-hidden shadow-2xl">
              <div className="relative z-10 space-y-10 max-w-4xl mx-auto">
                 <div className="space-y-6">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.9]">
                       Your School Data Always Remains <br/> <span className="text-blue-400">Under Your Control</span>
                    </h2>
                    <p className="text-blue-100 text-lg md:text-xl font-medium leading-relaxed">
                       If the Administrator does not grant permission, the user cannot access the page, view the data, export reports, or perform actions. The system remains completely under your command.
                    </p>
                 </div>
                 <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <div className="px-8 py-4 bg-blue-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl shadow-blue-500/20">
                       100% Permission Controlled
                    </div>
                    <div className="flex items-center gap-3">
                       <ShieldCheck className="w-6 h-6 text-emerald-400" />
                       <span className="text-sm font-black uppercase tracking-widest">GDPR & DPDP CONFORMANT</span>
                    </div>
                 </div>
              </div>
              <Shield className="absolute bottom-[-50px] right-[-50px] w-96 h-96 text-white/5 -rotate-12" />
              <LockIcon className="absolute top-[-50px] left-[-50px] w-64 h-64 text-white/5 rotate-12" />
           </div>
        </section>

      </main>

    </div>
  );
};
