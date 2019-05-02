using System.Collections.Generic;

namespace DrawSequence.ViewModels
{
    public class ResponseImageViewModel
    {
        public bool Succeeded;
        public List<string> Errors = new List<string>();
        public string RecognizedText;
        public int ExpectedNumber;
    }
}
