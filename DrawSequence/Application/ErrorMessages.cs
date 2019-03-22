namespace DrawSequence.Application
{
    public static class ErrorMessages
    {
        public const string SERVER_OVERLOADED = "Our number recognition service is overloaded. Try again.";
        public const string FILE_NULL = "File is empty.";
        public const string INVALID_RATIO = "Invalid image ratio: {0}. Accepted ratios are within {1} and {2}.";
        public const string INVALID_FILE_TYPE = "Invalid file type. Allowed: jpg, jpeg, bmp and png.";
        public const string FILE_SIZE_EXCEEDED = "Image size exceeds limit (2 MB).";
        public const string INVALID_NUMBER = "Expected {0}.";
        public const string CONCURRENCY = "Refresh page and try again.";
    }
}
