<?php

namespace App\Jobs;

use App\Services\QrService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\File;

class GenerateQrFromCode implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public string $code, public string $folder = 'app/public/qr_codes')
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $qr = app(QrService::class)->generate(data: $this->code);

        $folder = $this->folder;
        $filename = $this->code . '.png';
        $fullPath = storage_path("{$folder}/{$filename}");

        File::ensureDirectoryExists(storage_path($folder));
        $qr->saveToFile($fullPath);
    }
}
