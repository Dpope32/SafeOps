Add-Type -AssemblyName System.Drawing

$sizes = @{
    "mdpi" = 48
    "hdpi" = 72
    "xhdpi" = 96
    "xxhdpi" = 144
    "xxxhdpi" = 192
}

$sourceIcon = "assets/icon.png"
$sourceForeground = "assets/adaptive-icon.png"

foreach ($size in $sizes.GetEnumerator()) {
    $dpi = $size.Key
    $pixels = $size.Value
    
    # Load and resize icon
    $img = [System.Drawing.Image]::FromFile((Resolve-Path $sourceIcon))
    $bitmap = New-Object System.Drawing.Bitmap($pixels, $pixels)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.DrawImage($img, 0, 0, $pixels, $pixels)
    
    # Save launcher icon
    $targetPath = "android/app/src/main/res/mipmap-$dpi/ic_launcher.png"
    $bitmap.Save($targetPath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    # Save round launcher icon
    $targetRoundPath = "android/app/src/main/res/mipmap-$dpi/ic_launcher_round.png"
    $bitmap.Save($targetRoundPath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    # Clean up
    $graphics.Dispose()
    $bitmap.Dispose()
    $img.Dispose()
    
    # Now do the same for foreground
    $img = [System.Drawing.Image]::FromFile((Resolve-Path $sourceForeground))
    $bitmap = New-Object System.Drawing.Bitmap($pixels, $pixels)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.DrawImage($img, 0, 0, $pixels, $pixels)
    
    # Save foreground
    $targetForegroundPath = "android/app/src/main/res/mipmap-$dpi/ic_launcher_foreground.png"
    $bitmap.Save($targetForegroundPath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    # Clean up
    $graphics.Dispose()
    $bitmap.Dispose()
    $img.Dispose()
}
