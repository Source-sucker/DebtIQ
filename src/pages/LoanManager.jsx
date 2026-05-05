import React, { useState } from 'react';
import { Plus, Home, Car, GraduationCap, X, Wallet, Bell, MoreVertical, Layout } from 'lucide-react';

const LoanManager = () => {
  const [loans, setLoans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All Active');
  
  const [formData, setFormData] = useState({ 
    bank: '', 
    type: 'Personal', 
    amount: '', 
    rate: '', 
    emi: '' 
  });

  const handleCreateLoan = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      bank: formData.bank,
      type: formData.type,
      amount: parseFloat(formData.amount),
      rate: parseFloat(formData.rate),
      emi: parseFloat(formData.emi),
      progress: 0,
      status: "New",
      icon: getIcon(formData.type)
    };
    setLoans([newEntry, ...loans]);
    setIsModalOpen(false);
    setFormData({ bank: '', type: 'Personal', amount: '', rate: '', emi: '' });
  };

  const getIcon = (type) => {
    if (type.includes('Home') || type.includes('Mortgage')) return <Home size={20}/>;
    if (type.includes('Auto') || type.includes('Car')) return <Car size={20}/>;
    if (type.includes('Student')) return <GraduationCap size={20}/>;
    return <Wallet size={20}/>;
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 md:px-16 py-4 flex justify-between items-center">
        <h1 className="font-bebas text-3xl tracking-wider text-slate-900 font-medium">
          Debt<span className="text-emerald-950">IQ</span>
        </h1>
        <div className="flex items-center gap-4">
          <Bell size={20} className="text-slate-400" />
          <div className="h-10 w-10 rounded-full bg-emerald-950 flex items-center justify-center text-white font-bold">
            AK
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 md:p-16 flex flex-col gap-12">
        
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="font-bold text-4xl text-slate-900 mb-2">Loan Manager</h1>
            <p className="text-lg text-slate-500">Track, manage, and optimize your active liabilities.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-950 text-white px-6 py-3 rounded-full hover:bg-emerald-900 transition-colors flex items-center gap-2 shadow-[0_10px_30px_rgba(24,40,32,0.1)] font-bold text-sm uppercase tracking-wider"
          >
            <Plus size={18} />
            Add New Loan
          </button>
        </section>

        <section className="flex gap-4 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
          {["All Active", "Mortgages", "Auto Loans", "Personal", "Student"].map((filter) => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`font-bold text-xs uppercase tracking-widest pb-2 px-2 whitespace-nowrap transition-colors ${
                activeFilter === filter 
                ? "text-emerald-950 border-b-2 border-emerald-950" 
                : "text-slate-400 hover:text-emerald-950"
              }`}
            >
              {filter}
            </button>
          ))}
        </section>

        {loans.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-slate-200 rounded-[3rem] bg-white/50">
            <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-400 mb-6">
              <Layout size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No active loans found</h3>
            <p className="text-slate-500 mt-2">Click "Add New Loan" to build your portfolio.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {loans.map((loan) => (
              <div key={loan.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-emerald-950 group-hover:bg-emerald-950 group-hover:text-white transition-colors">
                      {loan.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-slate-900">{loan.bank}</h3>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{loan.type}</p>
                    </div>
                  </div>
                  <MoreVertical size={20} className="text-slate-300" />
                </div>

                <div className="mb-8">
                  <span className="text-[10px] font-black text-emerald-900 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">
                    {loan.status}
                  </span>
                  <div className="mt-4">
                    <p className="text-slate-400 text-xs font-semibold uppercase">Principal Remaining</p>
                    <h4 className="text-3xl font-bold text-slate-900 mt-1">
                      ${loan.amount.toLocaleString()}.00
                    </h4>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-6 border-y border-slate-50 mb-6 font-bold">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase">Rate</p>
                    <p className="text-slate-900 text-lg">{loan.rate}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase">EMI</p>
                    <p className="text-slate-900 text-lg">${loan.emi.toLocaleString()}</p>
                  </div>
                </div>

                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-950 rounded-full transition-all duration-700"
                    style={{ width: `${loan.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md">
          <div className="bg-white rounded-[3rem] w-full max-w-lg p-10 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-8 font-bold text-slate-900">
              <h2 className="text-3xl tracking-tight">Add Liability</h2>
              <button onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>

            <form onSubmit={handleCreateLoan} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-emerald-950 uppercase">Bank Name</label>
                  <input required placeholder="Lender Name" className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-950 outline-none" 
                    onChange={e => setFormData({...formData, bank: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-emerald-950 uppercase">Loan Type</label>
                  <select className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-950 outline-none"
                    onChange={e => setFormData({...formData, type: e.target.value})}>
                    <option>Personal</option>
                    <option>Mortgage</option>
                    <option>Auto Loan</option>
                    <option>Student Loan</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-emerald-950 uppercase">Principal</label>
                <input required type="number" placeholder="Total Debt" className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-950 outline-none"
                  onChange={e => setFormData({...formData, amount: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-emerald-950 uppercase">Rate (%)</label>
                  <input required type="number" step="0.1" placeholder="8.5" className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-950 outline-none"
                    onChange={e => setFormData({...formData, rate: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-emerald-950 uppercase">EMI</label>
                  <input required type="number" placeholder="Monthly" className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-950 outline-none"
                    onChange={e => setFormData({...formData, emi: e.target.value})} />
                </div>
              </div>

              <button type="submit" className="w-full bg-emerald-950 text-white font-bold py-5 rounded-2xl hover:bg-emerald-900 shadow-lg mt-4">
                Confirm & Add Loan
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanManager;