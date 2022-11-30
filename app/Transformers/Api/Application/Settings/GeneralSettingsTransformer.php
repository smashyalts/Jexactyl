<?php

namespace Pterodactyl\Transformers\Api\Application\Settings;

use Pterodactyl\Transformers\Api\Application\BaseTransformer;

class GeneralSettingsTransformer extends BaseTransformer
{
    /**
     * Return the resource name for the JSONAPI output.
     */
    public function getResourceName(): string
    {
        return 'setting';
    }

    /**
     * Return a transformed User model that can be consumed by external services.
     */
    public function transform(array $model): array
    {
        return [
            'panel_name' => $model['panel_name'],
            'panel_theme' => $model['panel_theme'],
            'panel_logo' => $model['panel_logo'],
            'panel_background' => $model['panel_background'],
        ];
    }
}
