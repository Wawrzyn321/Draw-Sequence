using System;
using System.Collections.Generic;

namespace DrawSequence.Application.ImageProcessing.EngineProvider
{
    public class TesseractEngineProvider : ITesseractEngineProvider
    {
        public int MaxCapacity { get; }

        private readonly List<TesseractEngineInstance> pool;

        public TesseractEngineProvider() : this(16)
        {
        }

        public TesseractEngineProvider(int maxCapacity)
        {
            MaxCapacity = maxCapacity;
            pool = new List<TesseractEngineInstance>();
        }

        public TesseractEngineInstance Rent()
        {
            foreach (var instance in pool)
            {
                if (!instance.IsInUse)
                {
                    instance.IsInUse = true;
                    return instance;
                }
            }

            if (pool.Count == MaxCapacity)
            {
                throw new InvalidOperationException("Pool capacity exceeded.");
            }

            var newInstance = new TesseractEngineInstance();
            newInstance.IsInUse = true;
            pool.Add(newInstance);
            return newInstance;
        }

        public void Release(TesseractEngineInstance engine)
        {
            int i = pool.FindIndex(e => Equals(e, engine));
            if (i == -1)
            {
                throw new IndexOutOfRangeException("Engine not found!");
            }
            pool[i].IsInUse = false;
        }
    }
}
