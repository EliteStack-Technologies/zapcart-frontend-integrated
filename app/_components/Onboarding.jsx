"use client";
import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, HelpCircle } from 'lucide-react';

const ONBOARDING_KEY = 'zap_seen_onboarding_v1';

export default function Onboarding() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [mounted, setMounted] = useState(false);

  const slides = [
    {
      title: 'Welcome to Zap Cart',
      body: 'Quick guide to get you started: learn how to add products, open the cart, and view product details.',
    },
    {
      title: 'Add products',
      body: 'Tap the Add button on a product card to add it to your cart. Once added, you will see a check mark on the product.',
    },
    {
      title: 'Open Cart',
      body: 'Use the floating cart button at the bottom-right to open your cart and manage quantities or checkout via WhatsApp.',
    },
    {
      title: 'View product details',
      body: 'Tap any product card (not the add/remove buttons) to open a detailed view with a larger image and Add button.',
    },
  ];

  useEffect(() => {
    setMounted(true);
    try {
      const seen = localStorage.getItem(ONBOARDING_KEY);
      if (!seen) {
        // Show onboarding on first visit after short delay so page loads
        const t = setTimeout(() => setOpen(true), 400);
        return () => clearTimeout(t);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const close = (persist = true) => {
    if (persist) {
      try {
        localStorage.setItem(ONBOARDING_KEY, '1');
      } catch (e) {
        // ignore
      }
    }
    setOpen(false);
    setStep(0);
  };

  const next = () => setStep((s) => Math.min(s + 1, slides.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  if (!mounted) return null;

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 right-4 z-60 h-10 w-10 rounded-full bg-white shadow flex items-center justify-center"
        title="Open help"
      >
        <HelpCircle className="w-5 h-5 text-emerald-600" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={() => close(true)} />
      <div className="relative z-10 max-w-xl w-full mx-4 bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#333333]">{slides[step].title}</h2>
            <p className="text-sm text-slate-600 mt-2">{slides[step].body}</p>
          </div>
          <button onClick={() => close(true)} className="text-slate-500 hover:text-slate-700 p-1">
            <X />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={prev} disabled={step === 0} className="px-3 py-2 text-[#333333] rounded border disabled:opacity-50">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button onClick={next} disabled={step === slides.length - 1} className="px-3 py-2 text-[#333333] rounded border disabled:opacity-50">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-sm text-slate-500">{step + 1} / {slides.length}</div>
            <button onClick={() => close(true)} className="px-4 py-2 bg-emerald-600 text-white rounded">Done</button>
            <button onClick={() => close(false)} className="px-3 py-2 rounded border text-[#333333]">Don't show again</button>
          </div>
        </div>
      </div>
    </div>
  );
}
