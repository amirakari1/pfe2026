# Download drink/food images for Sugar Cubes game
$base = "c:\Users\amir.akari\WebstormProjects\pfe-2026-web\src\assets\drinks"
$items = @(
    @{id="bogalim"; url="https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=300&h=300&fit=crop&q=80"},
    @{id="bogamenthe"; url="https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=300&h=300&fit=crop&q=80"},
    @{id="bogalight"; url="https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&h=300&fit=crop&q=80"},
    @{id="citronnade"; url="https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=300&h=300&fit=crop&q=80"},
    @{id="legmi"; url="https://images.unsplash.com/photo-1600274921353-4b4a64a98257?w=300&h=300&fit=crop&q=80"},
    @{id="thementhe"; url="https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=300&h=300&fit=crop&q=80"},
    @{id="cafetunisien"; url="https://images.unsplash.com/photo-1509042239860-f590ce592163?w=300&h=300&fit=crop&q=80"},
    @{id="kabisa"; url="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=300&h=300&fit=crop&q=80"},
    @{id="jusorange"; url="https://images.unsplash.com/photo-1600274921353-4b4a64a98257?w=300&h=300&fit=crop&q=80"},
    @{id="slim"; url="https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300&h=300&fit=crop&q=80"},
    @{id="sidiali"; url="https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&h=300&fit=crop&q=80"},
    @{id="juspomme"; url="https://images.unsplash.com/photo-1600274921353-4b4a64a98257?w=300&h=300&fit=crop&q=80"},
    @{id="hamoud"; url="https://images.unsplash.com/photo-1598556637015-f515d55608fd?w=300&h=300&fit=crop&q=80"},
    @{id="bonbon"; url="https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=300&h=300&fit=crop&q=80"},
    @{id="cake"; url="https://images.unsplash.com/photo-1578987683470-29954352f4de?w=300&h=300&fit=crop&q=80"},
    @{id="makroudh"; url="https://images.unsplash.com/photo-1600274921353-4b4a64a98257?w=300&h=300&fit=crop&q=80"},
    @{id="baklava"; url="https://images.unsplash.com/photo-1600274921353-4b4a64a98257?w=300&h=300&fit=crop&q=80"},
    @{id="zlabia"; url="https://images.unsplash.com/photo-1551024606-0b7f6d2c8e8e?w=300&h=300&fit=crop&q=80"},
    @{id="bambaloni"; url="https://images.unsplash.com/photo-1559302504-64aae0ca2a3d?w=300&h=300&fit=crop&q=80"},
    @{id="halva"; url="https://images.unsplash.com/photo-1600274921353-4b4a64a98257?w=300&h=300&fit=crop&q=80"},
    @{id="samsa"; url="https://images.unsplash.com/photo-1600274921353-4b4a64a98257?w=300&h=300&fit=crop&q=80"},
    @{id="kaak"; url="https://images.unsplash.com/photo-1558961363-fbb8ffef6e8e?w=300&h=300&fit=crop&q=80"},
    @{id="chocolat"; url="https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=300&h=300&fit=crop&q=80"},
    @{id="glace"; url="https://images.unsplash.com/photo-1560008585-3a94500bef4a?w=300&h=300&fit=crop&q=80"},
    @{id="biscuit"; url="https://images.unsplash.com/photo-1558961363-fbb8ffef6e8e?w=300&h=300&fit=crop&q=80"},
    @{id="mlabes"; url="https://images.unsplash.com/photo-1600274921353-4b4a64a98257?w=300&h=300&fit=crop&q=80"},
    @{id="dates"; url="https://images.unsplash.com/photo-1600274921353-4b4a64a98257?w=300&h=300&fit=crop&q=80"},
    @{id="gatouaamande"; url="https://images.unsplash.com/photo-1578987683470-29954352f4de?w=300&h=300&fit=crop&q=80"},
    @{id="croissant"; url="https://images.unsplash.com/photo-1555507034-ab90316327b5?w=300&h=300&fit=crop&q=80"},
    @{id="donut"; url="https://images.unsplash.com/photo-1551024606-0b7f6d2c8e8e?w=300&h=300&fit=crop&q=80"},
    @{id="nutella"; url="https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=300&h=300&fit=crop&q=80"},
    @{id="confiture"; url="https://images.unsplash.com/photo-1600274921353-4b4a64a98257?w=300&h=300&fit=crop&q=80"},
    @{id="miel"; url="https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=300&h=300&fit=crop&q=80"}
)
foreach ($item in $items) {
    try {
        Invoke-WebRequest -Uri $item.url -OutFile "$base\$($item.id).jpg" -UseBasicParsing
        Write-Host "Downloaded $($item.id).jpg"
    } catch {
        Write-Host "Failed $($item.id): $_"
    }
}
