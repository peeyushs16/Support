<?php

if (!function_exists('custom_asset')) {
    /**
     * Generate a URL for an asset with a custom base URL.
     *
     * @param  string  $path
     * @param  bool|null  $secure
     * @return string
     */
    function assetpublic($path, $secure = null)
    {
        // Customize the base URL as needed

        $baseUrl = rtrim(BASE_URL, "/");
        // $baseUrl = BASE_URL; // for xampp server
        $baseUrl = $baseUrl . (str_contains(BASE_URL, 'localhost:8080') ? 'public' : '');


        return app('url')->assetFrom($baseUrl, $path, $secure);
    }
}
