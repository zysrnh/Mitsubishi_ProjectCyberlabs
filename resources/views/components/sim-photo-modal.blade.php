<div class="p-4">
    @if($imageUrl)
        <div class="flex flex-col items-center space-y-4">
            <!-- Nama Pemilik SIM -->
            <div class="text-center mb-2">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    {{ $name }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                    Surat Izin Mengemudi
                </p>
            </div>

            <!-- Image Container dengan zoom on hover -->
            <div class="relative w-full max-w-3xl rounded-lg overflow-hidden shadow-lg border-2 border-gray-200 dark:border-gray-700">
                <img 
                    src="{{ $imageUrl }}" 
                    alt="Foto SIM - {{ $name }}"
                    class="w-full h-auto object-contain transition-transform duration-300 hover:scale-105 cursor-zoom-in"
                    onclick="this.classList.toggle('scale-150'); this.classList.toggle('cursor-zoom-out')"
                >
            </div>

            <!-- Helper Text -->
            <div class="text-center">
                <p class="text-xs text-gray-500 dark:text-gray-400">
                    💡 Klik gambar untuk zoom in/out
                </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-3 mt-4">
                <a 
                    href="{{ $imageUrl }}" 
                    target="_blank"
                    class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                    Buka di Tab Baru
                </a>
                
                <a 
                    href="{{ $imageUrl }}" 
                    download
                    class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                    Download
                </a>
            </div>
        </div>
    @else
        <div class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Foto SIM tidak tersedia
            </p>
        </div>
    @endif
</div>

<style>
    /* Smooth zoom transition */
    img.scale-150 {
        transform: scale(1.5);
        cursor: zoom-out;
    }
    
    img:not(.scale-150) {
        cursor: zoom-in;
    }
</style>