<?php

namespace Pterodactyl\Http\Controllers\Api\Application\Settings;

use Pterodactyl\Http\Controllers\Api\Application\ApplicationApiController;
use Pterodactyl\Transformers\Api\Application\Settings\GeneralSettingsTransformer;

class GeneralSettingsController extends ApplicationApiController
{
    /**
     * Get the current Panel settings.
     */
    public function index(): array
    {
        return $this->fractal->item([
            'panel_name' => config('app.name'),
            'panel_logo' => config('app.logo'),
            'panel_theme' => config('theme.admin'),
            'panel_background' => config('theme.user.background'),
        ])
            ->transformWith($this->getTransformer(GeneralSettingsTransformer::class))
            ->toArray();
    }
}
