using DrawSequence.Database;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DrawSequence.Application
{
    public class ContinuityManager
    {
        private readonly Context context;

        public ContinuityManager(Context context)
        {
            this.context = context;
        }

        public int GetCurrentNumber()
        {
            var files = context.Entries.ToArray();
            for (int i = 0; i < files.Length; i++)
            {
                if (files[i].Number != i + 1)
                {
                    throw new Exception($"Database corrupted at index {i}, file index: {files[i].Number}");
                }
            }
            //we want /next/ number
            return files.Length + 1;
        }

        public async Task<bool> TryIncrementCurrentNumber(ImageEntry entry)
        {
            if (entry.Number != GetCurrentNumber())
            {
                return false;
            }

            await context.SaveChangesAsync();
            context.Entries.Add(entry);
            return await context.SaveChangesAsync() == 1;
        }
    }
}
