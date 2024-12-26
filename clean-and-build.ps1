Set-Location android
Write-Host "Cleaning Gradle build..."
./gradlew clean

Write-Host "Removing build directory..."
Remove-Item -Path "app/build" -Recurse -Force

Write-Host "Assembling debug build..."
./gradlew assembleDebug
Write-Host "Clean and build completed."
