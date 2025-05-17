using System.ComponentModel;

namespace Hermes.Domain.Enums
{
    public enum BookCategory : int
    {
        [Description("None")]
        None = 0,

        [Description("Fantasy")]
        Fantasy = 1,

        [Description("ScienceFiction")]
        ScienceFiction = 2,

        [Description("Mystery")]
        Mystery = 3,

        [Description("Romance")]
        Romance = 4,

        [Description("Biography")]
        Biography = 5,

        [Description("History")]
        History = 6,

        [Description("Children")]
        Children = 7,

        [Description("Comics")]
        Comics = 8,

        [Description("Technology")]
        Technology = 9,

        [Description("Poetry")]
        Poetry = 10,

        [Description("Art")]
        Art = 11,

        [Description("Travel")]
        Travel = 12,

        [Description("Psychology")]
        Psychology = 13,
    }
}

