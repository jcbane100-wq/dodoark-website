"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle, ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="page-container flex items-center justify-center min-h-[60vh]">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 inline-flex rounded-full bg-emerald-500/10 p-4">
          <CheckCircle className="h-16 w-16 text-emerald-400" />
        </div>

        <h1 className="mb-3 text-3xl font-bold text-white">Payment Successful!</h1>

        <p className="mb-6 text-gray-400">
          Your purchase is being processed. Items will be delivered to your character
          in-game shortly.
        </p>

        <div className="mb-8 rounded-xl border border-zinc-700 bg-dark-800 p-4">
          <div className="flex items-center gap-3 text-left">
            <Clock className="h-5 w-5 text-yellow-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-white">Delivery Status</p>
              <p className="text-xs text-gray-400">
                Items are delivered via RCON. You may need to relog if you don&apos;t
                see them immediately. Allow up to 5 minutes.
              </p>
            </div>
          </div>
        </div>

        {sessionId && (
          <p className="mb-6 text-xs text-gray-600">
            Order Reference: {sessionId.slice(0, 20)}...
          </p>
        )}

        <Link
          href="/store"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/20 px-6 py-3 text-sm font-semibold text-emerald-400 transition-all hover:bg-emerald-500/30"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Store
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="page-container flex items-center justify-center min-h-[60vh]"><p className="text-gray-400">Loading...</p></div>}>
      <SuccessContent />
    </Suspense>
  );
}
