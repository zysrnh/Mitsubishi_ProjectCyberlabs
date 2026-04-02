<div class="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
    @if ($getRecord()->qr_path)
        <img src="{{ $getRecord()->qr_url }}" 
             alt="QR Code {{ $getRecord()->unique_code }}" 
             class="w-56 h-56 rounded-2xl shadow-xl border-8 border-white bg-white"
        >
        <p class="mt-4 text-sm font-black text-slate-500 tracking-[0.2em] uppercase">
            {{ $getRecord()->unique_code }}
        </p>
    @else
        <div class="w-48 h-48 flex items-center justify-center text-slate-300">
            <x-heroicon-o-qr-code class="w-12 h-12" />
        </div>
        <p class="mt-4 text-xs font-bold text-slate-400 italic">QR Code Belum Tersedia</p>
    @endif
</div>
