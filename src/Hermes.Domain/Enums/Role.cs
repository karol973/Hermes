using System.ComponentModel;

namespace Hermes.Domain.Enums
{
    public enum Role : int
    {
        [Description("None")]
        None = 0,

        [Description("User")]
        User = 1,

        [Description("Superuser")]
        SuperUser = 2,

        [Description("Admin")]
        Admin = 3
    }
}
