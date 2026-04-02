<div class="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
    @if ($getRecord()->qr_path && Storage::disk('public')->exists($getRecord()->qr_path))
        <img src="{{ Storage::disk('public')->url($getRecord()->qr_path) }}" 
             alt="QR Code" 
             class="w-48 h-48 rounded-2xl shadow-lg border-4 border-white"
        >
        <p class="mt-4 text-xs font-black text-slate-400 tracking-widest uppercase">
            {{ $getRecord()->unique_code }}
        </p>
    @else
        <div class="w-48 h-48 flex items-center justify-center text-slate-300">
            <x-heroicon-o-qr-code class="w-12 h-12" />
        </div>
        <p class="mt-4 text-xs font-bold text-slate-400 italic">QR Code Belum Tersedia</p>
    @endif
</div>
