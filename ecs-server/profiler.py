import cProfile
import pstats
import io
import psutil
import os
import tracemalloc
import time

def profile_main():
    # Start memory tracking
    tracemalloc.start()
    process = psutil.Process(os.getpid())
    
    # Record initial memory
    initial_memory = process.memory_info().rss / 1024 / 1024
    initial_time = time.time()

    # Performance profiling
    pr = cProfile.Profile()
    pr.enable()
    
    # Your existing code
    import dat
    model = dat.Model("glove.840B.300d.txt", "words.txt")
    for x in range(10000):
        model.dat(["car", "prong", "horns", "galaxy", "keeper", "ball", "cheese", "garlic", "explosion", "scheme"])
        model.dat(["car", "crap"])
        model.dat(["cream", "soul", "scream", "bird"])
    
    pr.disable()
    
    # Capture performance stats
    s = io.StringIO()
    ps = pstats.Stats(pr, stream=s).sort_stats('cumulative')
    ps.print_stats()
    performance_output = s.getvalue()

    # Memory tracking
    final_memory = process.memory_info().rss / 1024 / 1024
    final_time = time.time()
    
    # Get memory tracemalloc snapshot
    snapshot = tracemalloc.take_snapshot()
    top_stats = snapshot.statistics('lineno')
    
    # Prepare full output
    full_output = f"""
=== PERFORMANCE PROFILE ===
{performance_output}

=== MEMORY PROFILE ===
Initial Memory: {initial_memory:.2f} MB
Final Memory: {final_memory:.2f} MB
Memory Increase: {final_memory - initial_memory:.2f} MB
Total Execution Time: {final_time - initial_time:.4f} seconds

=== TOP MEMORY ALLOCATIONS ===
"""
    
    # Add top memory allocations to output
    for stat in top_stats[:10]:
        full_output += f"{stat}\n"
   
    # Save to file
    with open('profile_results.txt', 'w') as f:
        f.write(full_output)
    
    # Stop memory tracking
    tracemalloc.stop()

# Ensure dependencies are installed
try:
    profile_main()
except ImportError as e:
    print(f"Missing dependency: {e}")
    print("Please install required packages:")
    print("pip install psutil")