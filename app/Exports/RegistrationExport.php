<?php

namespace App\Exports;

use App\Models\Registration;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class RegistrationExport implements WithMultipleSheets
{
    protected $type;

    public function __construct($type = 'all')
    {
        $this->type = $type;
    }

    /**
     * @return array
     */
    public function sheets(): array
    {
        return [
            new RegistrationAttendedSheet($this->type),
            new RegistrationNotAttendedSheet($this->type),
        ];
    }
}