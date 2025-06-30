<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $fillable = [
        'task',
        'user_id',
        'content',
        'start_time',
        'end_time'];

}
