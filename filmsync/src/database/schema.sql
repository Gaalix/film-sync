CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(50) UNIQUE NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    LastLogin DATETIME
)

CREATE TABLE Content (
    ContentID INT PRIMARY KEY IDENTITY(1,1),
    TMDbID INT UNIQUE NOT NULL,
    Title NVARCHAR(255) NOT NULL,
    Type NVARCHAR(10) CHECK (Type IN ('Movie', 'TV Show')) NOT NULL,
    ReleaseDate DATE,
    Overview NVARCHAR(MAX),
    PosterPath NVARCHAR(255)
)

CREATE TABLE Watchlist (
    WatchlistID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    ContentID INT FOREIGN KEY REFERENCES Content(ContentID),
    Status NVARCHAR(20) CHECK (Status IN ('Want to Watch', 'Watching', 'Watched')) NOT NULL,
    DateAdded DATETIME DEFAULT GETDATE()
)

CREATE TABLE Reviews (
    ReviewID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    ContentID INT FOREIGN KEY REFERENCES Content(ContentID),
    Rating DECIMAL(3,1) CHECK (Rating >= 0 AND Rating <= 10),
    ReviewText NVARCHAR(MAX),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME
)