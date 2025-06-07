using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hermes.Shared.Enums
{
    public static class EnumHelper<T> where T : Enum
    {
        public static IEnumerable<KeyValuePair<int, string>> GetValues(bool skipDefault = false)
        {
            IEnumerable<T> values = Enum.GetValues(typeof(T)).Cast<T>();

            if (skipDefault)
            {
                values = values.Where(e => Convert.ToInt32(e) != 0);
            }

            return values
               .Select(e => new KeyValuePair<int, string>(Convert.ToInt32(e), ((Enum)e).GetDescription()))
               .ToList();
        }
    }
}
