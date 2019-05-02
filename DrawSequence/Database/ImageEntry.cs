using System;
using System.ComponentModel.DataAnnotations;

namespace DrawSequence.Database
{
    public class ImageEntry
    {

        [Key]
        public int Id { get; set; }
        public int Number { get; set; }
        public byte[] Content { get; set; }
        public DateTime CreatedDate { get; set; }

        public ImageEntry()
        {
        }

        public ImageEntry(byte[] content, int recognizedAsNumber)
        {
            Number = recognizedAsNumber;
            Content = content;
            CreatedDate = DateTime.Now;
        }
    }
}
