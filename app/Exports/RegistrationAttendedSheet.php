<?php

namespace App\Exports;

use App\Models\Registration;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class RegistrationAttendedSheet implements FromCollection, WithHeadings, WithMapping, WithStyles, WithTitle, WithColumnWidths
{
    protected $type;

    public function __construct($type = 'all')
    {
        $this->type = $type;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $query = Registration::query()
            ->where('has_attended', true); // Hanya yang sudah hadir

        // Filter berdasarkan tipe
        if ($this->type === 'karang_taruna') {
            $query->whereJsonContains('extras->type', 'karang_taruna');
        } elseif ($this->type === 'umum') {
            $query->whereJsonContains('extras->type', 'umum');
        } elseif ($this->type === 'vip') {
            $query->whereJsonContains('extras->type', 'vip');
        }

        return $query->orderBy('attended_at', 'desc')->get();
    }

    /**
     * @return array
     */
    public function headings(): array
    {
        return [
            'No',
            'Nama',
            'Nomor Telepon',
            'Tipe',
            'Daerah/Tingkatan',
            'Organisasi',
            'Instansi',
            'Jabatan',
            'Nomor Baju',
            'Waktu Hadir',
            'Kode Unik',
        ];
    }

    /**
     * @var Registration $registration
     */
    public function map($registration): array
    {
        static $index = 0;
        $index++;

        $type = $registration->extras['type'] ?? '-';
        $typeLabel = match($type) {
            'regular' => 'Karang Taruna',
            'public' => 'Umum',
            'vip' => 'VIP/VVIP',
            default => '-'
        };

        // Waktu hadir
        $attendedAt = '-';
        if ($registration->attended_at) {
            $attendedAt = $registration->attended_at->timezone('Asia/Jakarta')->format('d/m/Y H:i');
        }

        return [
            $index,
            $registration->name,
            $registration->phone,
            $typeLabel,
            $registration->extras['region'] ?? '-',
            $registration->extras['organization'] ?? '-',
            $registration->extras['institution'] ?? '-',
            $registration->extras['position'] ?? '-',
            $registration->extras['shirt_number'] ?? '-',
            $attendedAt,
            $registration->unique_code ?? '-',
        ];
    }

    /**
     * @return string
     */
    public function title(): string
    {
        return 'Sudah Hadir';
    }

    /**
     * @return array
     */
    public function styles(Worksheet $sheet)
    {
        $rowCount = $this->collection()->count() + 1; // +1 untuk header
        
        // Style untuk semua cell
        $sheet->getStyle('A1:K' . $rowCount)->applyFromArray([
            'borders' => [
                'allBorders' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                    'color' => ['rgb' => 'CCCCCC'],
                ],
            ],
            'alignment' => [
                'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
            ],
        ]);
        
        // Style untuk header
        $sheet->getStyle('A1:K1')->applyFromArray([
            'font' => [
                'bold' => true,
                'size' => 12,
                'color' => ['rgb' => 'FFFFFF'],
            ],
            'fill' => [
                'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                'startColor' => [
                    'rgb' => '28A745', // Warna hijau untuk yang hadir
                ],
            ],
            'alignment' => [
                'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
            ],
        ]);
        
        // Alignment untuk kolom tertentu
        $sheet->getStyle('A2:A' . $rowCount)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER); // No
        $sheet->getStyle('D2:D' . $rowCount)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER); // Tipe
        $sheet->getStyle('I2:I' . $rowCount)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER); // Nomor Baju
        $sheet->getStyle('J2:J' . $rowCount)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER); // Waktu Hadir
        $sheet->getStyle('K2:K' . $rowCount)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER); // Kode Unik
        
        // Set row height untuk header
        $sheet->getRowDimension(1)->setRowHeight(25);
        
        return [];
    }

    /**
     * @return array
     */
    public function columnWidths(): array
    {
        return [
            'A' => 5,   // No
            'B' => 25,  // Nama
            'C' => 18,  // Nomor Telepon
            'D' => 15,  // Tipe
            'E' => 20,  // Daerah/Tingkatan
            'F' => 20,  // Organisasi
            'G' => 20,  // Instansi
            'H' => 20,  // Jabatan
            'I' => 12,  // Nomor Baju
            'J' => 18,  // Waktu Hadir
            'K' => 15,  // Kode Unik
        ];
    }
}