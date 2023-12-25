using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace CsvParsing.Data
{
    public class PeopleRepo
    {
        private string _connectionString;
        public PeopleRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetAllPeople()
        {
            var context = new PeopleDbContext(_connectionString);
            return context.People.ToList();
        }
        public void DeleteAllPeople()
        {
            var context = new PeopleDbContext(_connectionString);
            context.People.RemoveRange(context.People);
            context.SaveChanges();
        }

        public void AddPeople(List<Person> people)
        {
            var context = new PeopleDbContext(_connectionString);
            context.People.AddRange(people);
            context.SaveChanges();
        }
    }
}
