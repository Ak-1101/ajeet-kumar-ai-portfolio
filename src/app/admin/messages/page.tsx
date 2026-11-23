'use client';

import React, { useState, useEffect } from 'react';
import { ContactMessage } from '@/types/database';
import { formatDate } from '@/lib/utils';
import { Mail, Check, Trash2, MailOpen, Calendar, ArrowUpRight } from 'lucide-react';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    fetch('/api/admin/content?collection=message')
      .then((r) => r.json())
      .then((d) => setMessages(d.data || []));
  }, []);

  const handleMarkRead = async (id: string) => {
    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'mark_read', collection: 'message', id }),
      });
      setMessages(messages.map((m) => (m.id === id ? { ...m, is_read: true } : m)));
    } catch {
      alert('Failed to mark read');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', collection: 'message', id }),
      });
      setMessages(messages.filter((m) => m.id !== id));
    } catch {
      alert('Failed to delete message');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white">Contact Inquiries & Messages</h2>
        <p className="text-xs text-slate-400">
          Messages submitted through the public contact form across training, collaboration, and consulting.
        </p>
      </div>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-6 rounded-2xl border transition-all ${
              !msg.is_read
                ? 'bg-[#0f1d38] border-cyan-500/50 shadow-lg'
                : 'bg-[#0c1428] border-slate-800'
            } space-y-4 text-xs`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base">{msg.name}</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {msg.inquiry_type}
                </span>
                {!msg.is_read && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500 text-white animate-pulse">
                    New
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate(msg.created_at)}</span>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-cyan-300">
                {msg.subject || 'Direct Inquiry'}
              </p>
              <p className="text-slate-300 text-sm leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                {msg.message}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80">
              <a
                href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Inquiry')}`}
                className="inline-flex items-center gap-1.5 font-bold text-cyan-400 hover:text-cyan-300"
              >
                <span>Reply to {msg.email}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-2">
                {!msg.is_read && (
                  <button
                    onClick={() => handleMarkRead(msg.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Mark as Read</span>
                  </button>
                )}
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="p-2 rounded-lg bg-slate-800 hover:text-rose-400 text-slate-300"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
