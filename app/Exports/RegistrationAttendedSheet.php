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

        return $query->orderBy('attended_at', 'desc')->get();
    }

    /**
     * @return array
     */
    public function headings(): array
    {
        return [
            'No',
            'Waktu Daftar',
            'Nama Lengkap',
            'Jabatan',
            'Nama Perusahaan',
            'NIA',
            'Alamat Perusahaan',
            'Telepon Perusahaan',
            'WhatsApp',
            'Email',
            'Website',
            'Media Sosial',
            'Komisi',
            'Waktu Check-in',
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

        return [
            $index,
            $registration->created_at?->timezone('Asia/Jakarta')->format('d/m/Y H:i') ?? '-',
            $registration->name,
            $registration->position,
            $registration->company_name,
            $registration->nia,
            $registration->company_address,
            $registration->company_phone,
            $registration->phone,
            $registration->email,
            $registration->website,
            $registration->social_media,
            $registration->commission_type,
            $registration->attended_at?->timezone('Asia/Jakarta')->format('d/m/Y H:i') ?? '-',
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
        $sheet->getStyle('A1:O' . $rowCount)->applyFromArray([
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
        $sheet->getStyle('A1:O1')->applyFromArray([
            'font' => [
                'bold' => true,
                'size' => 11,
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
        
        // Set row height untuk header
        $sheet->getRowDimension(1)->setRowHeight(30);
        
        return [];
    }

    /**
     * @return array
     */
    public function columnWidths(): array
    {
        return [
            'A' => 5,   // No
            'B' => 18,  // Waktu Daftar
            'C' => 25,  // Nama Lengkap
            'D' => 20,  // Jabatan
            'E' => 25,  // Nama Perusahaan
            'F' => 15,  // NIA
            'G' => 40,  // Alamat Perusahaan
            'H' => 18,  // Telepon Perusahaan
            'I' => 18,  // WhatsApp
            'J' => 25,  // Email
            'K' => 20,  // Website
            'L' => 20,  // Media Sosial
            'M' => 10,  // Komisi
            'N' => 18,  // Waktu Check-in
            'O' => 15,  // Kode Unik
        ];
    }
}